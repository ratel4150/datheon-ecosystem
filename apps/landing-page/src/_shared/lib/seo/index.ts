// _shared/lib/seo/index.ts — Public API
export { SITE_URL, SUPPORTED_LANGS, DEFAULT_LANG, PAGE_META } from './seoConfig';
export type { PageMeta } from './seoConfig';
export { buildOrganizationSchema, buildWebsiteSchema, buildEducationalOrgSchema, buildBreadcrumbSchema } from './structuredData';
