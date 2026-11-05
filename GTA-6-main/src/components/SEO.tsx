import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  ogImage?: string;
}

export function SEO({
  title,
  description = SITE_CONFIG.description,
  canonical,
  type = 'website',
  schema,
  ogImage = 'https://vicetools.app/og-banner.png'
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;
    
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `${SITE_CONFIG.url}${canonical}`)
    : SITE_CONFIG.url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schemas */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
