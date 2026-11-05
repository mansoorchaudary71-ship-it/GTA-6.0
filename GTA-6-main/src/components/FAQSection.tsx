import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { BadgeStatus } from './BadgeStatus';

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  status?: 'confirmed' | 'unconfirmed' | string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
  renderJsonLd?: boolean;
}

/**
 * Builds Schema.org FAQPage structured data object.
 * Adheres to Google Search Central FAQPage guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function buildFaqPageSchema(items: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Standalone component that injects only the Schema.org FAQPage JSON-LD tag into <head>
 */
export function FaqJsonLd({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  const schema = buildFaqPageSchema(faqs);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Full interactive FAQ Accordion UI with automated JSON-LD injection
 */
export function FAQSection({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  badge = 'Essential Intel',
  badgeColor = '#FFC857',
  className = '',
  renderJsonLd = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {renderJsonLd && <FaqJsonLd faqs={items} />}

      <section
        className={`max-w-4xl mx-auto space-y-6 ${className}`}
        aria-label={title}
      >
        {(badge || title) && (
          <div className="text-center mb-8">
            {badge && (
              <span
                className="text-xs font-mono font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-current/30 inline-block mb-2"
                style={{ color: badgeColor, backgroundColor: `${badgeColor}15` }}
              >
                {badge}
              </span>
            )}
            <h2 className="font-['Orbitron'] font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-[#B9A6D4] max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const itemId = item.id || `faq-item-${index}`;
            const contentId = `faq-content-${itemId}`;
            const headerId = `faq-header-${itemId}`;

            return (
              <div
                key={itemId}
                className="rounded-2xl border border-white/10 bg-[#150A24] overflow-hidden transition-all duration-200 hover:border-[#FF2E93]/40 shadow-md"
              >
                <button
                  id={headerId}
                  onClick={() => toggleIndex(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <div className="flex items-center gap-3">
                    {item.status ? (
                      <BadgeStatus status={item.status} size="sm" />
                    ) : (
                      <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <HelpCircle className="w-3.5 h-3.5 text-[#19E3D0]" />
                      </div>
                    )}
                    <span className="font-semibold text-sm sm:text-base text-white">
                      {item.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#FF2E93] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#B9A6D4] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed border-t border-white/5 animate-in fade-in duration-200"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
