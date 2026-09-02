// _features/legal/lib/index.ts — Public API
export { C, DARK, MONO, DISPLAY } from './constants';
export { chrome } from './content';
export type { LegalChromeContent } from './content';
export { resolveLang } from './resolveLang';
export { PRIVACY_DOC } from './privacyContent';
export type { LegalDocument, LegalSection } from './privacyContent';
export { TERMS_DOC } from './termsContent';
