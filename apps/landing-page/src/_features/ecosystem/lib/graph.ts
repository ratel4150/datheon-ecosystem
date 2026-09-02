// File: apps/landing-page/src/_features/ecosystem/lib/graph.ts
// _features/ecosystem/lib/graph.ts
export type NodeId = string;
export type NodeLevel = 'core' | 'category' | 'sub' | 'subsub';

export interface NodeData {
  id: NodeId;
  label: string;
  metadata: string[];
  /** id del nodo padre — el canvas lo usa para heredar ícono/color cuando el nodo no tiene uno propio explícito. */
  parent?: NodeId;
  /** URL de una imagen/logo. Si no se define, se usa el ícono asignado en ui/EcosystemGraphCanvas. */
  image?: string;
}

export interface EdgeData {
  source: NodeId;
  target: NodeId;
}

interface LeafGroup {
  label: string;
  items: string[];
}

interface CategoryDefinition {
  id: string;
  label: string;
  color: string;
  groups: LeafGroup[];
}

// 7 categorías × 3 subnodos × 5 sub-subnodos = 105 hojas + 21 subnodos +
// 7 categorías + 1 core = 134 nodos en total.
const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 'software',
    label: 'SOFTWARE',
    color: '#6C5CE7',
    groups: [
      { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Angular', 'Astro'] },
      { label: 'Backend', items: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Fastify'] },
      { label: 'DevTools', items: ['TypeScript', 'Vite', 'Storybook', 'ESLint', 'Figma'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    color: '#D6336C',
    groups: [
      { label: 'Modelos', items: ['GPT-4', 'Claude', 'Gemini', 'LLaMA', 'Mistral'] },
      { label: 'Frameworks', items: ['LangChain', 'LlamaIndex', 'Haystack', 'AutoGPT', 'CrewAI'] },
      { label: 'Capacidades', items: ['RAG Pipelines', 'Fine-tuning', 'Prompt Engineering', 'Computer Vision', 'NLP'] },
    ],
  },
  {
    id: 'data',
    label: 'DATA',
    color: '#0CA678',
    groups: [
      { label: 'Bases de Datos', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Neon'] },
      { label: 'Analítica', items: ['BigQuery', 'Snowflake', 'Power BI', 'Tableau', 'Looker'] },
      { label: 'Pipelines', items: ['Apache Kafka', 'Airflow', 'dbt', 'ETL Pipelines', 'Vector Databases'] },
    ],
  },
  {
    id: 'cloud',
    label: 'CLOUD',
    color: '#1971C2',
    groups: [
      { label: 'Proveedores', items: ['AWS', 'Azure', 'Google Cloud', 'Vercel', 'Cloudflare'] },
      { label: 'Infraestructura', items: ['Docker', 'Kubernetes', 'Terraform', 'Serverless', 'CI/CD'] },
      { label: 'Redes', items: ['CDN', 'Load Balancing', 'Auto Scaling', 'GPU Clusters', 'Object Storage'] },
    ],
  },
  {
    id: 'edge',
    label: 'EDGE',
    color: '#E8590C',
    groups: [
      { label: 'Cómputo Edge', items: ['Edge Functions', 'WebAssembly', 'Local Inference', 'On-Device AI', 'CDN Caching'] },
      { label: 'Comunicación', items: ['MQTT', 'WebSockets', 'gRPC', '5G Networks', 'Low Latency APIs'] },
      { label: 'Dispositivos', items: ['Raspberry Pi', 'NVIDIA Jetson', 'Micro-Frontends', 'Service Workers', 'Real-Time Streaming'] },
    ],
  },
  {
    id: 'iot',
    label: 'IOT',
    color: '#F08C00',
    groups: [
      { label: 'Sensores', items: ['Sensors', 'RFID', 'Smart Meters', 'Environmental Monitors', 'Machine Vision'] },
      { label: 'Control Industrial', items: ['PLCs', 'SCADA', 'Actuators', 'RTUs', 'Digital Twins'] },
      { label: 'Conectividad', items: ['Modbus', 'Zigbee', 'LoRaWAN', 'Industrial Robots', 'Predictive Maintenance'] },
    ],
  },
  {
    id: 'agents',
    label: 'AGENTS',
    color: '#5F3DC4',
    groups: [
      { label: 'Arquitectura', items: ['Multi-Agent Systems', 'MCP', 'A2A Protocol', 'Agent Frameworks', 'Orchestration'] },
      { label: 'Capacidades', items: ['Memory Systems', 'Tool Use', 'Planning', 'Function Calling', 'ReAct'] },
      { label: 'Evaluación', items: ['Autonomous Workflows', 'Task Decomposition', 'Human-in-the-Loop', 'AutoGPT-style Agents', 'Agent Evaluation'] },
    ],
  },
];

const CORE_COLOR = '#0077B6';
const RADIUS = { core: 32, category: 18, sub: 12, subsub: 9 } as const;

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildGraph(): {
  nodes: NodeData[];
  edges: EdgeData[];
  color: Record<NodeId, string>;
  radius: Record<NodeId, number>;
  level: Record<NodeId, NodeLevel>;
} {
  const nodes: NodeData[] = [{ id: 'core', label: 'DATHEÓN', metadata: [] }];
  const edges: EdgeData[] = [];
  const color: Record<NodeId, string> = { core: CORE_COLOR };
  const radius: Record<NodeId, number> = { core: RADIUS.core };
  const level: Record<NodeId, NodeLevel> = { core: 'core' };

  CATEGORY_DEFINITIONS.forEach((cat) => {
    // Nivel 1: categoría
    nodes.push({ id: cat.id, label: cat.label, metadata: cat.groups.map((g) => g.label), parent: 'core' });
    edges.push({ source: 'core', target: cat.id });
    color[cat.id] = cat.color;
    radius[cat.id] = RADIUS.category;
    level[cat.id] = 'category';

    cat.groups.forEach((group) => {
      // Nivel 2: subnodo (grupo)
      const subId = `${cat.id}-${slugify(group.label)}`;
      nodes.push({ id: subId, label: group.label, metadata: group.items, parent: cat.id });
      edges.push({ source: cat.id, target: subId });
      color[subId] = cat.color;
      radius[subId] = RADIUS.sub;
      level[subId] = 'sub';

      group.items.forEach((item) => {
        // Nivel 3: sub-subnodo (hoja) — hereda `parent` de su grupo
        const leafId = `${subId}-${slugify(item)}`;
        nodes.push({ id: leafId, label: item, metadata: [], parent: subId });
        edges.push({ source: subId, target: leafId });
        color[leafId] = cat.color;
        radius[leafId] = RADIUS.subsub;
        level[leafId] = 'subsub';
      });
    });
  });

  // Conexiones cruzadas entre categorías (relaciones reales del ecosistema, no jerárquicas)
  edges.push(
    { source: 'ai', target: 'agents' },
    { source: 'ai', target: 'data' },
    { source: 'cloud', target: 'edge' },
    { source: 'edge', target: 'iot' },
    { source: 'software', target: 'agents' },
  );

  return { nodes, edges, color, radius, level };
}

const GRAPH = buildGraph();

export const NODES: NodeData[] = GRAPH.nodes;
export const EDGES: EdgeData[] = GRAPH.edges;

/** Radio por nodo — core > categoría > subnodo > sub-subnodo. */
export const NODE_RADIUS: Record<NodeId, number> = GRAPH.radius;

/** Color por nodo — subnodos y sub-subnodos heredan el color de su categoría. */
export const NODE_COLOR: Record<NodeId, string> = GRAPH.color;

/** Nivel jerárquico de cada nodo. */
export const NODE_LEVEL: Record<NodeId, NodeLevel> = GRAPH.level;

/** Nombres de los nodos conectados a nodeId (excluyendo 'core'). */
export function connectedLabels(nodeId: NodeId, edges: EdgeData[], nodes: NodeData[]): string[] {
  const ids = new Set<NodeId>();
  edges.forEach((e) => {
    if (e.source === nodeId) ids.add(e.target);
    if (e.target === nodeId) ids.add(e.source);
  });
  ids.delete('core');
  return nodes.filter((n) => ids.has(n.id)).map((n) => n.label);
}