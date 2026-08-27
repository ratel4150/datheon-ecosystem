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
  // Grupo 1: Contenedores e Infraestructura Global
  { id: 'CLOUD_PROVIDER', label: 'Proveedor Cloud', group: 'infra' },
  { id: 'EDGE_LOCATION', label: 'Ubicación Edge', group: 'infra' },
  { id: 'VIRTUAL_NETWORK', label: 'Red Virtual', group: 'infra' },
  { id: 'NETWORK_SUBNET', label: 'Subred', group: 'infra' },
  { id: 'COMPUTE_CLUSTER', label: 'Clúster de Cómputo', group: 'infra' },
  { id: 'VIRTUAL_MACHINE', label: 'Máquina Virtual', group: 'infra' },
  // Grupo 2: Motores de Ejecución y Código
  { id: 'MONOLITH_RUNTIME', label: 'Aplicación Monolítica', group: 'compute' },
  { id: 'MICROSERVICE_NODE', label: 'Microservicio', group: 'compute' },
  { id: 'SERVERLESS_FUNCTION', label: 'Función Serverless', group: 'compute' },
  { id: 'EDGE_WORKER', label: 'Worker Edge', group: 'compute' },
  { id: 'BACKGROUND_WORKER', label: 'Worker en Segundo Plano', group: 'compute' },
  { id: 'CHRON_JOB', label: 'Tarea Programada', group: 'compute' },
  // Grupo 3: Datos, Caché y Analítica
  { id: 'RELATIONAL_DB', label: 'Base de Datos Relacional', group: 'data' },
  { id: 'NOSQL_DB', label: 'Base de Datos NoSQL', group: 'data' },
  { id: 'IN_MEMORY_CACHE', label: 'Caché en Memoria', group: 'data' },
  { id: 'VECTOR_DB', label: 'Base de Datos Vectorial', group: 'data' },
  { id: 'DATA_WAREHOUSE', label: 'Data Warehouse', group: 'data' },
  { id: 'OBJECT_STORAGE', label: 'Almacenamiento de Objetos', group: 'data' },
  // Grupo 4: Tráfico, Conectividad y Mensajería
  { id: 'API_GATEWAY', label: 'API Gateway', group: 'traffic' },
  { id: 'LOAD_BALANCER', label: 'Balanceador de Carga', group: 'traffic' },
  { id: 'EVENT_BROKER', label: 'Broker de Eventos', group: 'traffic' },
  { id: 'SERVICE_MESH', label: 'Service Mesh', group: 'traffic' },
  { id: 'NETWORK_TUNNEL', label: 'Túnel de Red', group: 'traffic' },
  // Grupo 5: Blindaje y Ciberseguridad
  { id: 'IDENTITY_PROVIDER', label: 'Proveedor de Identidad', group: 'security' },
  { id: 'WEB_FIREWALL', label: 'Firewall Web', group: 'security' },
  { id: 'CRYPTO_KEY_MANAGER', label: 'Gestor de Llaves', group: 'security' },
  { id: 'TRAFFIC_ENCRYPTOR', label: 'Encriptación de Tráfico', group: 'security' },
  // Grupo 6: Operaciones, Integraciones y Monitoreo
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

/** Color del grupo al que pertenece un blockType — con fallback gris si
 *  Groq devolviera un id fuera de la taxonomía. */
export function blockGroupColor(blockType: string): string {
  const block = BLOCK_BY_ID.get(blockType);
  if (!block) return '#8891A6';
  return GROUP_BY_ID.get(block.group)?.color ?? '#8891A6';
}

export function isValidBlockType(blockType: string): boolean {
  return BLOCK_BY_ID.has(blockType);
}
