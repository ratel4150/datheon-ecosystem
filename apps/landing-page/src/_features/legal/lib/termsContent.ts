// _features/legal/lib/termsContent.ts
import type { Lang } from '@/_shared/types/i18n';
import type { LegalDocument } from './privacyContent';

export const TERMS_DOC: Record<Lang, LegalDocument> = {
  es: {
    title: 'Términos de Servicio',
    lastUpdated: '2026-01-01',
    sections: [
      {
        heading: '1. Aceptación',
        body: ['Al usar este sitio, aceptas estos términos. Si no estás de acuerdo, por favor no lo uses.'],
      },
      {
        heading: '2. Qué ofrecemos',
        body: [
          'Datheón ofrece servicios de ingeniería de software e inteligencia artificial. Datheón Academy es una iniciativa educativa sin fines de lucro; algunos cursos avanzados podrán tener costo en el futuro.',
        ],
      },
      {
        heading: '3. Uso del sitio',
        body: ['No debes usar este sitio de forma que pueda dañarlo, sobrecargarlo, o vulnerar su seguridad.'],
      },
      {
        heading: '4. Propiedad intelectual',
        body: ['El contenido de este sitio (textos, diseño, código visible) es propiedad de Datheón, salvo que se indique lo contrario.'],
      },
      {
        heading: '5. Enlaces a terceros',
        body: ['Este sitio enlaza a servicios de terceros (Calendly, WhatsApp, redes sociales). No somos responsables del contenido o las políticas de esos sitios.'],
      },
      {
        heading: '6. Limitación de responsabilidad',
        body: ['Este sitio se ofrece "tal cual", sin garantías de ningún tipo, en la medida permitida por la ley aplicable.'],
      },
      {
        heading: '7. Cambios a estos términos',
        body: ['Podemos actualizar estos términos ocasionalmente.'],
      },
      {
        heading: '8. Ley aplicable',
        body: ['[Jurisdicción legal pendiente de confirmar.]'],
      },
      {
        heading: '9. Contacto',
        body: ['Preguntas sobre estos términos: [correo de contacto pendiente].'],
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    lastUpdated: '2026-01-01',
    sections: [
      { heading: '1. Acceptance', body: ['By using this site, you accept these terms.'] },
      {
        heading: '2. What we offer',
        body: ['Datheón provides software engineering and AI services. Datheón Academy is a nonprofit educational initiative; some advanced courses may have a cost in the future.'],
      },
      { heading: '3. Use of the site', body: ['You must not use this site in a way that could damage, overload, or compromise its security.'] },
      { heading: '4. Intellectual property', body: ['Content on this site is owned by Datheón unless stated otherwise.'] },
      { heading: '5. Third-party links', body: ['This site links to third-party services (Calendly, WhatsApp, social media). We are not responsible for their content or policies.'] },
      { heading: '6. Limitation of liability', body: ['This site is provided "as is", without warranties of any kind, to the extent permitted by applicable law.'] },
      { heading: '7. Changes', body: ['We may update these terms occasionally.'] },
      { heading: '8. Governing law', body: ['[Legal jurisdiction pending confirmation.]'] },
      { heading: '9. Contact', body: ['Questions about these terms: [contact email pending].'] },
    ],
  },
  fr: {
    title: 'Conditions générales',
    lastUpdated: '2026-01-01',
    sections: [
      { heading: '1. Acceptation', body: ['En utilisant ce site, vous acceptez ces conditions.'] },
      {
        heading: '2. Ce que nous offrons',
        body: ["Datheón propose des services d'ingénierie logicielle et d'IA. Datheón Academy est une initiative éducative à but non lucratif ; certains cours avancés pourraient avoir un coût à l'avenir."],
      },
      { heading: '3. Utilisation du site', body: ['Vous ne devez pas utiliser ce site de manière à l\'endommager ou compromettre sa sécurité.'] },
      { heading: '4. Propriété intellectuelle', body: ['Le contenu de ce site appartient à Datheón, sauf indication contraire.'] },
      { heading: '5. Liens tiers', body: ["Ce site renvoie vers des services tiers (Calendly, WhatsApp, réseaux sociaux). Nous ne sommes pas responsables de leur contenu."] },
      { heading: '6. Limitation de responsabilité', body: ['Ce site est fourni "tel quel", sans garantie d\'aucune sorte.'] },
      { heading: '7. Modifications', body: ['Ces conditions peuvent être mises à jour occasionnellement.'] },
      { heading: '8. Loi applicable', body: ['[Juridiction légale en attente de confirmation.]'] },
      { heading: '9. Contact', body: ['Questions : [e-mail de contact en attente].'] },
    ],
  },
};
