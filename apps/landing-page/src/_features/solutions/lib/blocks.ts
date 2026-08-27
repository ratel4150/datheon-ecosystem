// _features/solutions/lib/blocks.ts
export type GroupId = 'infra' | 'compute' | 'data' | 'traffic' | 'security' | 'ops';

export interface BlockGroup {
  id: GroupId;
  label: string;
  color: string;
}

export interface BlockDefinition {
  id: string;
  label: string;
  group: GroupId;
}

export const GROUPS: BlockGroup[] = [
  { id: 'infra', label: 'Infraestructura Global', color: '#1971C2' },
  { id: 'compute', label: 'Motores de Ejecución', color: '#6C5CE7' },
  { id: 'data', label: 'Datos, Caché y Analítica', color: '#0CA678' },
  { id: 'traffic', label: 'Tráfico y Conectividad', color: '#F08C00' },
  { id: 'security', label: 'Blindaje y Ciberseguridad', color: '#D6336C' },
  { id: 'ops', label: 'Operaciones e Integraciones', color: '#5F3DC4' },
];

export const BLOCKS: BlockDefinition[] = [
  { id: 'CLOUD_PROVIDER', label: 'Proveedor Cloud', group: 'infra' },
  { id: 'EDGE_LOCATION', label: 'Ubicación Edge', group: 'infra' },
  { id: 'VIRTUAL_NETWORK', label: 'Red Virtual', group: 'infra' },
  { id: 'NETWORK_SUBNET', label: 'Subred', group: 'infra' },
  { id: 'COMPUTE_CLUSTER', label: 'Clúster de Cómputo', group: 'infra' },
  { id: 'VIRTUAL_MACHINE', label: 'Máquina Virtual', group: 'infra' },
  { id: 'MONOLITH_RUNTIME', label: 'Aplicación Monolítica', group: 'compute' },
  { id: 'MICROSERVICE_NODE', label: 'Microservicio', group: 'compute' },
  { id: 'SERVERLESS_FUNCTION', label: 'Función Serverless', group: 'compute' },
  { id: 'EDGE_WORKER', label: 'Worker Edge', group: 'compute' },
  { id: 'BACKGROUND_WORKER', label: 'Worker en Segundo Plano', group: 'compute' },
  { id: 'CHRON_JOB', label: 'Tarea Programada', group: 'compute' },
  { id: 'RELATIONAL_DB', label: 'Base de Datos Relacional', group: 'data' },
  { id: 'NOSQL_DB', label: 'Base de Datos NoSQL', group: 'data' },
  { id: 'IN_MEMORY_CACHE', label: 'Caché en Memoria', group: 'data' },
  { id: 'VECTOR_DB', label: 'Base de Datos Vectorial', group: 'data' },
  { id: 'DATA_WAREHOUSE', label: 'Data Warehouse', group: 'data' },
  { id: 'OBJECT_STORAGE', label: 'Almacenamiento de Objetos', group: 'data' },
  { id: 'API_GATEWAY', label: 'API Gateway', group: 'traffic' },
  { id: 'LOAD_BALANCER', label: 'Balanceador de Carga', group: 'traffic' },
  { id: 'EVENT_BROKER', label: 'Broker de Eventos', group: 'traffic' },
  { id: 'SERVICE_MESH', label: 'Service Mesh', group: 'traffic' },
  { id: 'NETWORK_TUNNEL', label: 'Túnel de Red', group: 'traffic' },
  { id: 'IDENTITY_PROVIDER', label: 'Proveedor de Identidad', group: 'security' },
  { id: 'WEB_FIREWALL', label: 'Firewall Web', group: 'security' },
  { id: 'CRYPTO_KEY_MANAGER', label: 'Gestor de Llaves', group: 'security' },
  { id: 'TRAFFIC_ENCRYPTOR', label: 'Encriptación de Tráfico', group: 'security' },
  { id: 'EXTERNAL_API', label: 'API Externa', group: 'ops' },
  { id: 'METRICS_COLLECTOR', label: 'Colector de Métricas', group: 'ops' },
  { id: 'LOG_AGGREGATOR', label: 'Agregador de Logs', group: 'ops' },
  { id: 'CI_CD_RUNNER', label: 'Runner CI/CD', group: 'ops' },
  { id: 'CONTAINER_REGISTRY', label: 'Registro de Contenedores', group: 'ops' },
];

export interface ArchitectureNode {
  blockType: string;
  label: string;
  children?: ArchitectureNode[];
}

const BLOCK_BY_ID = new Map(BLOCKS.map((b) => [b.id, b]));
const GROUP_BY_ID = new Map(GROUPS.map((g) => [g.id, g]));

export function blockGroupColor(blockType: string): string {
  const block = BLOCK_BY_ID.get(blockType);
  if (!block) return '#8891A6';
  return GROUP_BY_ID.get(block.group)?.color ?? '#8891A6';
}

export function blockGroupOf(blockType: string): GroupId | undefined {
  return BLOCK_BY_ID.get(blockType)?.group;
}

export function isValidBlockType(blockType: string): boolean {
  return BLOCK_BY_ID.has(blockType);
}

export interface TreeStats {
  totalBlocks: number;
  maxDepth: number;
  groupIds: GroupId[];
}

/** Recorre el árbol real devuelto por Groq y calcula números reales —
 *  esto es lo que hace visible que la generación fue reactiva, no una
 *  imagen fija: cada árbol distinto produce estadísticas distintas. */
export function analyzeTree(node: ArchitectureNode): TreeStats {
  let totalBlocks = 0;
  let maxDepth = 0;
  const groups = new Set<GroupId>();

  function walk(current: ArchitectureNode, depth: number) {
    totalBlocks += 1;
    maxDepth = Math.max(maxDepth, depth);
    const group = blockGroupOf(current.blockType);
    if (group) groups.add(group);
    (current.children ?? []).forEach((child) => walk(child, depth + 1));
  }

  walk(node, 1);
  return { totalBlocks, maxDepth, groupIds: Array.from(groups) };
}
