#!/usr/bin/env python3
"""Extract VICE-TOOLS-ALL-CHANGED-FILES.md into a directory tree.

Usage:
    python3 extract-bundle.py VICE-TOOLS-ALL-CHANGED-FILES.md [output-dir]

    output-dir defaults to "." (the current directory — run it from your
    repo root).

What it does:
  - Reads the bundle, finds the "<!-- BEGIN FILES -->" marker, then parses
    each "## <repo-relative-path>" section: the file's complete contents
    sit in a four-backtick fenced block (four backticks are used because
    file contents may themselves contain triple-backtick fences).
  - Writes every file to <output-dir>/<repo-relative-path>, creating
    folders as needed. It never deletes anything.
  - Verifies each written file's byte size against the bundle's table of
    contents and reports any mismatch.

Trailing newlines: a file whose content ends with a newline has one extra
blank line before its closing fence in the bundle. That blank line is part
of the file — the extractor keeps it, so files round-trip byte-for-byte.

Safety: paths are rejected if they are absolute or contain "..".
Requires Python 3.8+.
"""

import os
import re
import sys

MARKER = "<!-- BEGIN FILES -->"
FENCE = "````"
TOC_ROW = re.compile(r"^\| `([^`]+)` \| (\d+) \| (\d+) \|$")


def parse_bundle(text):
    """Return (expected_bytes, [(path, content), ...])."""
    lines = text.split("\n")
    # Strip a trailing \r from each line (defensive; the bundle is LF-only).
    lines = [ln[:-1] if ln.endswith("\r") else ln for ln in lines]

    expected_bytes = {}
    try:
        marker_idx = lines.index(MARKER)
    except ValueError:
        raise SystemExit(f"error: marker {MARKER!r} not found in bundle")
    # Only scan lines BEFORE the marker for table-of-contents rows — file
    # contents after the marker may contain similar-looking table rows.
    for ln in lines[:marker_idx]:
        m = TOC_ROW.match(ln)
        if m:
            expected_bytes[m.group(1)] = int(m.group(3))

    start = marker_idx + 1

    files = []
    i = start
    n = len(lines)
    while i < n:
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if not line.startswith("## "):
            raise SystemExit(f"error: line {i + 1}: expected '## <path>', got: {line!r}")
        path = line[3:].strip()
        if not path or os.path.isabs(path) or ".." in path.split("/"):
            raise SystemExit(f"error: line {i + 1}: unsafe path: {path!r}")
        i += 1
        while i < n and not lines[i].strip():
            i += 1  # blank line between the header and the fence
        if i >= n or not lines[i].startswith(FENCE):
            raise SystemExit(f"error: line {i + 1}: expected a ```` fence after {path!r}")
        i += 1
        content_lines = []
        while i < n and lines[i] != FENCE:
            content_lines.append(lines[i])
            i += 1
        if i >= n:
            raise SystemExit(f"error: unterminated fenced block for {path!r}")
        i += 1  # skip closing fence
        files.append((path, "\n".join(content_lines)))
    return expected_bytes, files


def main(argv):
    if len(argv) < 2 or len(argv) > 3:
        print(__doc__.strip().split("\n\n")[0])
        print("usage: python3 extract-bundle.py VICE-TOOLS-ALL-CHANGED-FILES.md [output-dir]")
        return 2
    bundle_path, out_dir = argv[1], (argv[2] if len(argv) == 3 else ".")

    with open(bundle_path, encoding="utf-8", newline="") as f:
        text = f.read()
    expected_bytes, files = parse_bundle(text)

    written = 0
    mismatches = []
    for path, content in files:
        target = os.path.join(out_dir, *path.split("/"))
        abs_target = os.path.abspath(target)
        abs_out = os.path.abspath(out_dir)
        if os.path.commonpath([abs_target, abs_out]) != abs_out:
            raise SystemExit(f"error: path escapes output dir: {path!r}")
        os.makedirs(os.path.dirname(abs_target) or abs_out, exist_ok=True)
        with open(abs_target, "w", encoding="utf-8", newline="") as f:
            f.write(content)
        written += 1
        if path in expected_bytes:
            actual = os.path.getsize(abs_target)
            if actual != expected_bytes[path]:
                mismatches.append((path, expected_bytes[path], actual))

    print(f"extracted {written} file(s) into {os.path.abspath(out_dir)}")
    if mismatches:
        print("SIZE MISMATCHES (file differs from the bundle table of contents):")
        for path, expected, actual in mismatches:
            print(f"  {path}: expected {expected} bytes, got {actual}")
        return 1
    print("all file sizes match the bundle table of contents")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
