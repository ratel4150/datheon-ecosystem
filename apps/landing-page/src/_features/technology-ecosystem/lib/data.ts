// File: apps/landing-page/src/_features/technology-ecosystem/lib/data.ts
// _features/technology-ecosystem/lib/data.ts
type TechItem = { name: string; tag?: string; blurb?: string };
type Category = { id: string; label: string; items: TechItem[] };

export const CATEGORIES: Category[] = [
  {
    id: 'cloud', label: 'CLOUD & INFRASTRUCTURE',
    items: [
      { name: 'AWS' }, { name: 'Azure' }, { name: 'Google Cloud' },
      { name: 'Docker', tag: 'CONTAINERS', blurb: 'Empaquetado · Portabilidad · CI/CD' },
      { name: 'Kubernetes', tag: 'ORCHESTRATION', blurb: 'Escalado · Alta disponibilidad' },
      { name: 'Cloudflare' },
    ],
  },
  {
    id: 'business', label: 'BUSINESS SYSTEMS',
    items: [
      { name: 'SAP' },
      { name: 'Odoo', tag: 'CRM', blurb: 'Uno de los CRMs que integramos · Ventas · Clientes' },
      { name: 'Salesforce', tag: 'CRM', blurb: 'Uno de los CRMs que integramos · Ventas · Clientes' },
      { name: 'Microsoft Dynamics' }, { name: 'Oracle' }, { name: 'HubSpot' },
    ],
  },
  {
    id: 'ai', label: 'AI',
    items: [
      { name: 'OpenAI' },
      { name: 'Anthropic', tag: 'AI ENGINEERING', blurb: 'LLM · RAG · Agents · Swarms' },
      { name: 'Google Gemini' }, { name: 'Hugging Face' }, { name: 'Local Models' },
    ],
  },
  {
    id: 'data', label: 'DATA',
    items: [
      { name: 'PostgreSQL', tag: 'DATA', blurb: 'Transacciones · Analítica · Capa de datos IA' },
      { name: 'MySQL' }, { name: 'SQL Server' }, { name: 'MongoDB' }, { name: 'Redis' }, { name: 'Vector DBs' },
    ],
  },
  {
    id: 'hardware', label: 'HARDWARE & COMPUTE',
    items: [
      { name: 'NVIDIA', tag: 'AI COMPUTE', blurb: 'GPU Infrastructure · Inference · Training' },
      { name: 'AMD' }, { name: 'Intel' }, { name: 'ARM' }, { name: 'Edge Computing' },
    ],
  },
  {
    id: 'software', label: 'SOFTWARE',
    items: [
      { name: 'React' }, { name: 'Next.js' }, { name: 'Node.js' }, { name: 'Python' }, { name: 'TypeScript' }, { name: '.NET' },
    ],
  },
  {
    id: 'iot', label: 'IoT & CONNECTIVITY',
    items: [
      { name: 'MQTT' }, { name: 'Modbus' }, { name: 'LoRa' }, { name: 'BLE' }, { name: 'ESP32' }, { name: 'PLC' },
    ],
  },
  {
    id: 'integrations', label: 'INTEGRATIONS',
    items: [
      { name: 'WhatsApp', tag: 'COMMUNICATION', blurb: 'Messaging · Customer Service · AI Agents' },
      { name: 'Shopify', tag: 'COMMERCE', blurb: 'E-commerce · Payments · Inventory · Automation' },
      { name: 'REST APIs' }, { name: 'GraphQL' }, { name: 'Webhooks' },
    ],
  },
];

export const SPOTLIGHT_NODES = [
  { name: 'WhatsApp', x: 160, y: 40 },
  { name: 'Shopify',  x: 274, y: 123, highlight: true },
  { name: 'REST APIs', x: 230, y: 257 },
  { name: 'GraphQL',  x: 90, y: 257 },
  { name: 'Webhooks', x: 46, y: 123 },
] as const;
