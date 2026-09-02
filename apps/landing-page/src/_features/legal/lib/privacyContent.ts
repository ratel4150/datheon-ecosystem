// _features/legal/lib/privacyContent.ts
import type { Lang } from '@/_shared/types/i18n';

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const PRIVACY_DOC: Record<Lang, LegalDocument> = {
  es: {
    title: 'Aviso de Privacidad',
    lastUpdated: '2026-01-01',
    sections: [
      {
        heading: '1. Responsable de tus datos',
        body: [
          '[Razón social legal pendiente] ("Datheón", "nosotros"), con domicilio en [domicilio fiscal pendiente] y RFC [pendiente], es responsable del tratamiento de tus datos personales conforme a este aviso.',
        ],
      },
      {
        heading: '2. Qué información recopilamos',
        body: [
          'Recopilamos únicamente lo siguiente: tu correo electrónico si te suscribes al newsletter; tus preferencias de navegación (tema claro/oscuro, idioma, la etapa que elegiste en Datheón Academy) guardadas localmente en tu navegador; y, solo si aceptas las cookies de analítica o marketing, datos de uso del sitio recolectados por Google Analytics, Microsoft Clarity, Meta o Google Ads.',
          'Si nos contactas por WhatsApp, correo electrónico, o agendas una llamada por Calendly, la información que compartas en esos canales está sujeta a las políticas de privacidad de esas plataformas, no solo a la nuestra.',
        ],
      },
      {
        heading: '3. Cómo usamos tu información',
        body: [
          'Usamos tu correo únicamente para enviarte el newsletter al que te suscribiste. Usamos los datos de analítica (si diste tu consentimiento) para entender cómo se usa el sitio y mejorarlo. No vendemos tu información a terceros.',
        ],
      },
      {
        heading: '4. Cookies',
        body: [
          'Usamos cookies necesarias (para que el sitio funcione), de analítica (Google Analytics, Microsoft Clarity) y de marketing (Meta, Google Ads) — estas dos últimas categorías solo se activan si las aceptas explícitamente. Puedes cambiar tu elección en cualquier momento desde el botón "Configuración de cookies" en el pie de página.',
        ],
      },
      {
        heading: '5. Tus derechos (ARCO)',
        body: [
          'Tienes derecho a acceder, rectificar, cancelar u oponerte al uso de tus datos personales. Para ejercer estos derechos, escríbenos a [correo de contacto pendiente].',
        ],
      },
      {
        heading: '6. Seguridad',
        body: [
          'Tomamos medidas razonables para proteger tu información, aunque ningún sistema es completamente infalible.',
        ],
      },
      {
        heading: '7. Cambios a este aviso',
        body: [
          'Podemos actualizar este aviso ocasionalmente. La fecha de "última actualización" en la parte superior refleja la versión vigente.',
        ],
      },
      {
        heading: '8. Contacto',
        body: ['Si tienes preguntas sobre este aviso, escríbenos a [correo de contacto pendiente].'],
      },
    ],
  },
  en: {
    title: 'Privacy Notice',
    lastUpdated: '2026-01-01',
    sections: [
      {
        heading: '1. Data controller',
        body: [
          '[Legal entity name pending] ("Datheón", "we"), located at [registered address pending], is responsible for processing your personal data under this notice.',
        ],
      },
      {
        heading: '2. What information we collect',
        body: [
          'We collect only the following: your email if you subscribe to the newsletter; your browsing preferences (light/dark theme, language, the stage you selected in Datheón Academy) stored locally in your browser; and, only if you accept analytics or marketing cookies, usage data collected by Google Analytics, Microsoft Clarity, Meta, or Google Ads.',
          'If you contact us via WhatsApp, email, or book a call through Calendly, information you share there is subject to those platforms\' own privacy policies as well as ours.',
        ],
      },
      {
        heading: '3. How we use your information',
        body: [
          'We use your email only to send the newsletter you subscribed to. We use analytics data (if you consented) to understand site usage and improve it. We do not sell your information to third parties.',
        ],
      },
      {
        heading: '4. Cookies',
        body: [
          'We use necessary cookies (to make the site work), analytics cookies (Google Analytics, Microsoft Clarity), and marketing cookies (Meta, Google Ads) — the latter two only activate with your explicit consent. You can change your choice anytime via the "Cookie settings" button in the footer.',
        ],
      },
      {
        heading: '5. Your rights',
        body: [
          'You have the right to access, correct, delete, or object to the use of your personal data. To exercise these rights, write to us at [contact email pending].',
        ],
      },
      {
        heading: '6. Security',
        body: ['We take reasonable measures to protect your information, though no system is completely infallible.'],
      },
      {
        heading: '7. Changes to this notice',
        body: ['We may update this notice occasionally. The "last updated" date above reflects the current version.'],
      },
      {
        heading: '8. Contact',
        body: ['If you have questions about this notice, write to us at [contact email pending].'],
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    lastUpdated: '2026-01-01',
    sections: [
      {
        heading: '1. Responsable du traitement',
        body: [
          '[Raison sociale légale en attente] (« Datheón », « nous ») est responsable du traitement de vos données personnelles conformément à cette politique.',
        ],
      },
      {
        heading: '2. Quelles informations nous collectons',
        body: [
          'Nous collectons uniquement : votre e-mail si vous vous inscrivez à la newsletter ; vos préférences de navigation (thème, langue, étape choisie dans Datheón Academy) stockées localement ; et, uniquement si vous acceptez les cookies analytiques ou marketing, des données collectées par Google Analytics, Microsoft Clarity, Meta ou Google Ads.',
        ],
      },
      {
        heading: '3. Comment nous utilisons vos informations',
        body: ["Nous utilisons votre e-mail uniquement pour la newsletter. Nous n'utilisons les données analytiques que si vous y consentez. Nous ne vendons jamais vos informations."],
      },
      {
        heading: '4. Cookies',
        body: [
          'Cookies nécessaires (fonctionnement du site), analytiques (Google Analytics, Microsoft Clarity) et marketing (Meta, Google Ads) — ces deux dernières catégories nécessitent votre consentement explicite. Modifiable à tout moment via « Paramètres des cookies » dans le pied de page.',
        ],
      },
      {
        heading: '5. Vos droits',
        body: ["Vous avez le droit d'accéder, de rectifier, de supprimer ou de vous opposer à l'utilisation de vos données. Écrivez-nous à [e-mail de contact en attente]."],
      },
      {
        heading: '6. Sécurité',
        body: ['Nous prenons des mesures raisonnables pour protéger vos informations.'],
      },
      {
        heading: '7. Modifications',
        body: ['Cette politique peut être mise à jour occasionnellement.'],
      },
      {
        heading: '8. Contact',
        body: ['Pour toute question, écrivez-nous à [e-mail de contact en attente].'],
      },
    ],
  },
};
