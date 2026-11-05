import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      setError('Please provide your name or gamertag.');
      return;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please provide a message with at least 10 characters.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact Vice Tools | Inquiries & Feedback"
        description="Submit feedback, suggest new GTA 6 map coordinates, or report server anomalies to the Vice Tools developer crew."
        canonical="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#FF7A18]">Contact</span>
        </nav>

        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF7A18]/40 text-xs font-mono text-[#FF7A18] mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNITY INBOX</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Contact & <span className="text-[#FF7A18]">Suggestions</span>
          </h1>
          <p className="mt-2 text-sm text-[#B9A6D4]">
            Have a coordinate correction, partnership query, or feature request? We read every submission.
          </p>
        </header>

        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-[#19E3D0]/20 border border-[#19E3D0] text-[#19E3D0] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white">Message Dispatched!</h2>
              <p className="text-sm text-[#B9A6D4] max-w-md mx-auto leading-relaxed">
                Thank you for your dispatch, <strong>{name}</strong>. Our moderators will review your note and respond via <strong>{email}</strong> if follow-up is necessary.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white border border-white/10 cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-mono">
              {error && (
                <div className="p-3.5 rounded-xl bg-[#FF2E93]/10 border border-[#FF2E93]/40 text-[#FF2E93] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B9A6D4] mb-1.5">Your Name / Gamertag</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jason_Vice99"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-[#FF7A18] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#B9A6D4] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jason@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-[#FF7A18] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#B9A6D4] mb-1.5">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#FF7A18] focus:outline-none"
                >
                  <option value="Feedback / Suggestion">Feedback / Feature Suggestion</option>
                  <option value="Coordinate Correction">Map Coordinate Correction</option>
                  <option value="Telemetry Bug Report">Calculator / Stat Bug Report</option>
                  <option value="Partnership Inquiry">Partnership / Advertising Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B9A6D4] mb-1.5">Message Details</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any coordinates, links, or detailed steps..."
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-[#FF7A18] focus:outline-none text-sm font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-['Orbitron'] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#FF2E93]/30 cursor-pointer min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
