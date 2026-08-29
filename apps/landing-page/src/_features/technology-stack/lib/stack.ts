// _features/technology-stack/lib/stack.ts
export type LayerId = 'experience' | 'application' | 'data' | 'intelligence' | 'infrastructure' | 'physical';

export interface StackTech {
  id: string;
  label: string;
  /** Otras capas con las que esta tecnología se relaciona — alimenta
   *  "Trace the Stack". No todas las tecnologías la necesitan. */
  relatedLayers?: LayerId[];
}

export interface StackLayerDefinition {
  id: LayerId;
  number: string;
  label: string;
  description: string;
  techs: StackTech[];
}

export const STACK_LAYERS: StackLayerDefinition[] = [
  {
    id: 'experience',
    number: '01',
    label: 'EXPERIENCE',
    description: 'Donde el usuario toca el sistema por primera vez.',
    techs: [
      { id: 'web', label: 'Web' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'ux-ui', label: 'UX/UI' },
      { id: 'design-systems', label: 'Design Systems' },
      { id: 'realtime-interfaces', label: 'Real-time Interfaces' },
    ],
  },
  {
    id: 'application',
    number: '02',
    label: 'APPLICATION',
    description: 'La lógica que convierte intención en función.',
    techs: [
      { id: 'react', label: 'React', relatedLayers: ['experience'] },
      { id: 'nextjs', label: 'Next.js', relatedLayers: ['experience'] },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'python', label: 'Python' },
      { id: 'dotnet', label: '.NET' },
      { id: 'apis', label: 'APIs', relatedLayers: ['data', 'infrastructure'] },
      { id: 'saas', label: 'SaaS' },
      { id: 'enterprise-software', label: 'Enterprise Software' },
    ],
  },
  {
    id: 'data',
    number: '03',
    label: 'DATA',
    description: 'Donde vive, se estructura y fluye la información.',
    techs: [
      { id: 'postgresql', label: 'PostgreSQL', relatedLayers: ['application'] },
      { id: 'sql-server', label: 'SQL Server' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'redis', label: 'Redis' },
      { id: 'data-platforms', label: 'Data Platforms' },
      { id: 'bi', label: 'BI' },
      { id: 'analytics', label: 'Analytics' },
    ],
  },
  {
    id: 'intelligence',
    number: '04',
    label: 'INTELLIGENCE',
    description: 'El razonamiento que interpreta y decide.',
    techs: [
      { id: 'llms', label: 'LLMs' },
      { id: 'generative-ai', label: 'Generative AI' },
      { id: 'rag', label: 'RAG', relatedLayers: ['data', 'application'] },
      { id: 'ai-agents', label: 'AI Agents', relatedLayers: ['data', 'application', 'infrastructure'] },
      { id: 'mcp', label: 'MCP', relatedLayers: ['data', 'application', 'infrastructure'] },
      { id: 'a2a', label: 'A2A' },
      { id: 'machine-learning', label: 'Machine Learning' },
      { id: 'computer-vision', label: 'Computer Vision' },
      { id: 'multimodal-ai', label: 'Multimodal AI' },
    ],
  },
  {
    id: 'infrastructure',
    number: '05',
    label: 'INFRASTRUCTURE',
    description: 'Lo que sostiene todo, siempre en pie.',
    techs: [
      { id: 'cloud', label: 'Cloud' },
      { id: 'docker', label: 'Docker' },
      { id: 'kubernetes', label: 'Kubernetes', relatedLayers: ['application', 'physical'] },
      { id: 'devops', label: 'DevOps' },
      { id: 'gpu', label: 'GPU' },
      { id: 'ci-cd', label: 'CI/CD' },
      { id: 'on-prem', label: 'On-Prem' },
      { id: 'private-ai', label: 'Private AI', relatedLayers: ['intelligence'] },
    ],
  },
  {
    id: 'physical',
    number: '06',
    label: 'PHYSICAL',
    description: 'Donde el software toca el mundo real.',
    techs: [
      { id: 'iot', label: 'IoT', relatedLayers: ['infrastructure', 'data'] },
      { id: 'sensors', label: 'Sensors' },
      { id: 'plc', label: 'PLC' },
      { id: 'edge-computing', label: 'Edge Computing', relatedLayers: ['infrastructure'] },
      { id: 'edge-ai', label: 'Edge AI', relatedLayers: ['infrastructure', 'intelligence'] },
      { id: 'robotics', label: 'Robotics' },
      { id: 'machines', label: 'Machines' },
    ],
  },
];

export function getLayer(id: LayerId): StackLayerDefinition | undefined {
  return STACK_LAYERS.find((l) => l.id === id);
}

export function getLayerIndex(id: LayerId): number {
  return STACK_LAYERS.findIndex((l) => l.id === id);
}

export function findTechLayer(techId: string): StackLayerDefinition | undefined {
  return STACK_LAYERS.find((l) => l.techs.some((t) => t.id === techId));
}

export function findTech(techId: string): StackTech | undefined {
  for (const layer of STACK_LAYERS) {
    const tech = layer.techs.find((t) => t.id === techId);
    if (tech) return tech;
  }
  return undefined;
}
