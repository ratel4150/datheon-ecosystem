// _features/stage/lib/stages.ts
export type StageId = 'idea' | 'startup' | 'pyme' | 'mid' | 'enterprise' | 'innovation';

export interface StageDefinition {
  id: StageId;
  number: string;
  label: string;
  tagline: string;
  forWhom: string;
  color: string;
  techs: string[];
}

export const STAGES: StageDefinition[] = [
  {
    id: 'idea',
    number: '01',
    label: 'IDEA / EMPRENDIMIENTO',
    tagline: 'Tengo una idea y quiero convertirla en realidad.',
    forWhom: 'Emprendedores, pequeños negocios, nuevos productos.',
    color: '#0CA678',
    techs: ['Landing', 'App Móvil', 'Sistema de Reservas', 'POS', 'E-commerce', 'MVP', 'Automatización', 'AI Assistant'],
  },
  {
    id: 'startup',
    number: '02',
    label: 'STARTUP',
    tagline: 'Ya estamos construyendo y necesitamos velocidad.',
    forWhom: 'Equipos que ya construyen y necesitan moverse rápido, sin deuda técnica absurda.',
    color: '#6C5CE7',
    techs: ['MVP', 'Product-Market Fit', 'Escalabilidad', 'Integraciones', 'Automatización', 'AI', 'Cloud', 'Analytics'],
  },
  {
    id: 'pyme',
    number: '03',
    label: 'PYME',
    tagline: 'Estamos creciendo y nuestra tecnología tiene que seguirnos.',
    forWhom: 'Negocios en crecimiento que dejan de operar como pequeño negocio y empiezan a necesitar sistemas.',
    color: '#1971C2',
    techs: ['ERP', 'CRM', 'Automatización', 'Data', 'Integraciones', 'E-commerce', 'Apps', 'Cloud', 'AI'],
  },
  {
    id: 'mid',
    number: '04',
    label: 'MID-MARKET',
    tagline: 'Tenemos sistemas, datos y operaciones complejas.',
    forWhom: 'Operaciones que ya generan datos y sistemas propios, y necesitan que todo se conecte.',
    color: '#F08C00',
    techs: ['Integraciones', 'Data Platforms', 'AI', 'Agents', 'Cloud', 'Infraestructura', 'Seguridad', 'Automatización', 'APIs', 'Modernización Legacy'],
  },
  {
    id: 'enterprise',
    number: '05',
    label: 'ENTERPRISE',
    tagline: 'Necesitamos transformar un ecosistema tecnológico existente.',
    forWhom: 'Organizaciones con arquitectura, gobernanza y sistemas heredados que hay que evolucionar sin romper nada.',
    color: '#D6336C',
    techs: ['Enterprise Architecture', 'AI Strategy', 'Private AI', 'On-Prem', 'GPU Infrastructure', 'Data', 'MCP', 'Agents', 'Modernización Legacy', 'Cloud', 'Seguridad', 'Gobernanza'],
  },
  {
    id: 'innovation',
    number: '06',
    label: 'INNOVATION / R&D',
    tagline: 'Queremos explorar lo que viene después.',
    forWhom: 'Equipos que quieren experimentar, no solo implementar tecnología existente.',
    color: '#5F3DC4',
    techs: ['AI Agents', 'Multi-Agent Systems', 'MCP', 'A2A', 'Robótica', 'Edge AI', 'Computer Vision', 'Digital Twins', 'Local AI', 'GPU Computing', 'Tecnología Experimental', 'Proof of Concept'],
  },
];

export const GOALS: string[] = ['Escalar', 'Automatizar', 'Digitalizar', 'Incorporar IA', 'Expandir'];

export function findStage(id: string): StageDefinition | undefined {
  return STAGES.find((s) => s.id === id);
}
