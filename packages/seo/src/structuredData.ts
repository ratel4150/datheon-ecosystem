// packages/seo/src/structuredData.ts

export function buildOrganizationSchema(siteUrl: string, socialUrls: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Datheón',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: socialUrls,
  };
}

export function buildWebsiteSchema(siteUrl: string, siteName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    inLanguage: ['es', 'en', 'fr'],
  };
}

/** No incluye `nonprofitStatus` — ese campo exige un código legal
 *  específico (ej. IRS 501c3) que no se puede afirmar sin confirmar el
 *  registro legal real de la organización. */
export function buildEducationalOrgSchema(siteUrl: string, lang: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Datheón Academy',
    url: `${siteUrl}/${lang}`,
    description,
    parentOrganization: { '@type': 'Organization', name: 'Datheón', url: siteUrl },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  };
}
