// _shared/lib/seo/structuredData.ts
import { SITE_URL } from './seoConfig';

// TODO: reemplaza por los enlaces reales — mismo placeholder que
// _widgets/footer/lib/socialLinks.ts. Si esos ya están actualizados con
// datos reales, cópialos aquí también (por ahora son dos fuentes
// separadas, ver nota en la respuesta).
const SOCIAL_URLS = [
  'https://linkedin.com/company/datheon',
  'https://github.com/datheon',
  'https://x.com/datheon',
];

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Datheón',
    url: SITE_URL,
    // TODO: sube un logo real (idealmente 512x512 o mayor, fondo transparente)
    logo: `${SITE_URL}/logo.png`,
    sameAs: SOCIAL_URLS,
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Datheón',
    url: SITE_URL,
    inLanguage: ['es', 'en', 'fr'],
  };
}

/** Nota: NO incluye `nonprofitStatus` — ese campo de schema.org exige un
 *  código legal específico (ej. "Nonprofit501c3", una designación del
 *  IRS de EE.UU.). No tengo confirmado el registro legal exacto de
 *  Academy, así que afirmarlo aquí sería una declaración legal no
 *  verificada. El texto de `description` ya comunica "sin fines de
 *  lucro" en lenguaje natural, sin necesidad de ese campo estructurado. */
export function buildEducationalOrgSchema(lang: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Datheón Academy',
    url: `${SITE_URL}/${lang}/universidad`,
    description,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Datheón',
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
