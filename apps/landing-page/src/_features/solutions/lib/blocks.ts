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
  description: string;
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
  { id: 'CLOUD_PROVIDER', label: 'Proveedor Cloud', group: 'infra', description: 'La base sobre la que corre todo: el proveedor cloud que aloja tu infraestructura con la escala y confiabilidad que tu negocio necesita.' },
  { id: 'EDGE_LOCATION', label: 'Ubicación Edge', group: 'infra', description: 'Acerca el procesamiento a tus usuarios, sin importar dónde estén, para que cada interacción se sienta instantánea.' },
  { id: 'VIRTUAL_NETWORK', label: 'Red Virtual', group: 'infra', description: 'Un espacio de red privado y aislado — tu infraestructura vive protegida, sin exponerse innecesariamente al resto de internet.' },
  { id: 'NETWORK_SUBNET', label: 'Subred', group: 'infra', description: 'Divide tu red en zonas con propósito claro: lo público, lo privado, lo crítico — cada cosa en su lugar.' },
  { id: 'COMPUTE_CLUSTER', label: 'Clúster de Cómputo', group: 'infra', description: 'Un grupo de servidores que trabajan como uno solo, repartiendo la carga para que nada se caiga cuando más lo necesitas.' },
  { id: 'VIRTUAL_MACHINE', label: 'Máquina Virtual', group: 'infra', description: 'Un servidor dedicado, listo para correr exactamente lo que tu aplicación necesita, sin sorpresas.' },
  { id: 'MONOLITH_RUNTIME', label: 'Aplicación Monolítica', group: 'compute', description: 'Toda tu lógica de negocio en un solo lugar — simple de mantener, ideal para arrancar rápido y con foco.' },
  { id: 'MICROSERVICE_NODE', label: 'Microservicio', group: 'compute', description: 'Una pieza independiente y desacoplada de tu sistema — se actualiza, escala y falla sin arrastrar al resto.' },
  { id: 'SERVERLESS_FUNCTION', label: 'Función Serverless', group: 'compute', description: 'Código que se ejecuta solo cuando hace falta, sin servidores que mantener ni costos cuando nadie lo usa.' },
  { id: 'EDGE_WORKER', label: 'Worker Edge', group: 'compute', description: 'Lógica ultraligera que corre lo más cerca posible de tus usuarios, para respuestas casi instantáneas.' },
  { id: 'BACKGROUND_WORKER', label: 'Worker en Segundo Plano', group: 'compute', description: 'Se encarga del trabajo pesado detrás de escena, sin hacer esperar a tus usuarios ni un segundo.' },
  { id: 'CHRON_JOB', label: 'Tarea Programada', group: 'compute', description: 'Tareas que se repiten solas, en el momento exacto, sin que nadie tenga que acordarse de ejecutarlas.' },
  { id: 'RELATIONAL_DB', label: 'Base de Datos Relacional', group: 'data', description: 'Donde vive la información crítica de tu negocio, organizada, consistente y siempre confiable.' },
  { id: 'NOSQL_DB', label: 'Base de Datos NoSQL', group: 'data', description: 'Guarda datos flexibles a alta velocidad — ideal cuando la forma de la información cambia constantemente.' },
  { id: 'IN_MEMORY_CACHE', label: 'Caché en Memoria', group: 'data', description: 'Respuestas instantáneas para lo que se consulta una y otra vez, sin golpear tu base de datos cada vez.' },
  { id: 'VECTOR_DB', label: 'Base de Datos Vectorial', group: 'data', description: 'El motor detrás de la búsqueda inteligente y la inteligencia artificial que entiende el significado, no solo las palabras.' },
  { id: 'DATA_WAREHOUSE', label: 'Data Warehouse', group: 'data', description: 'Todo tu histórico de datos, organizado para que tomes decisiones con base en hechos, no en corazonadas.' },
  { id: 'OBJECT_STORAGE', label: 'Almacenamiento de Objetos', group: 'data', description: 'Un lugar seguro y económico para guardar archivos, imágenes y documentos, sin límite práctico de espacio.' },
  { id: 'API_GATEWAY', label: 'API Gateway', group: 'traffic', description: 'La puerta de entrada única y controlada a todos tus servicios — organiza, protege y simplifica cómo el mundo exterior habla con tu sistema.' },
  { id: 'LOAD_BALANCER', label: 'Balanceador de Carga', group: 'traffic', description: 'Reparte el tráfico entrante de forma inteligente, para que ningún servidor se sature mientras otros están libres.' },
  { id: 'EVENT_BROKER', label: 'Broker de Eventos', group: 'traffic', description: 'El sistema nervioso de tu arquitectura: conecta partes que necesitan enterarse de lo que pasa en otras, sin acoplarse directamente.' },
  { id: 'SERVICE_MESH', label: 'Service Mesh', group: 'traffic', description: 'Coordina cómo se comunican tus microservicios entre sí, con seguridad y visibilidad, sin que tengas que programarlo a mano.' },
  { id: 'NETWORK_TUNNEL', label: 'Túnel de Red', group: 'traffic', description: 'Una conexión privada y cifrada entre dos puntos — para que datos sensibles nunca viajen expuestos.' },
  { id: 'IDENTITY_PROVIDER', label: 'Proveedor de Identidad', group: 'security', description: 'Controla quién entra y qué puede hacer — el guardián de acceso de todo tu sistema.' },
  { id: 'WEB_FIREWALL', label: 'Firewall Web', group: 'security', description: 'Filtra el tráfico malicioso antes de que llegue a tocar tu aplicación.' },
  { id: 'CRYPTO_KEY_MANAGER', label: 'Gestor de Llaves', group: 'security', description: 'Guarda tus secretos y llaves de cifrado en una bóveda separada, lejos de manos equivocadas.' },
  { id: 'TRAFFIC_ENCRYPTOR', label: 'Encriptación de Tráfico', group: 'security', description: 'Cifra cada conexión, para que lo que viaja por la red sea ilegible para cualquiera que intente interceptarlo.' },
  { id: 'EXTERNAL_API', label: 'API Externa', group: 'ops', description: 'Conecta tu sistema con herramientas del mundo real que ya usas — pagos, mensajería, lo que haga falta.' },
  { id: 'METRICS_COLLECTOR', label: 'Colector de Métricas', group: 'ops', description: 'Te dice, en tiempo real, cómo está funcionando todo — antes de que un problema se vuelva una crisis.' },
  { id: 'LOG_AGGREGATOR', label: 'Agregador de Logs', group: 'ops', description: 'Reúne el historial completo de lo que pasó en tu sistema, para investigar cualquier cosa cuando haga falta.' },
  { id: 'CI_CD_RUNNER', label: 'Runner CI/CD', group: 'ops', description: 'Automatiza que cada cambio de código se pruebe y despliegue solo, sin procesos manuales propensos a error.' },
  { id: 'CONTAINER_REGISTRY', label: 'Registro de Contenedores', group: 'ops', description: 'Guarda versiones listas de tu aplicación, empaquetadas y listas para desplegar en cualquier momento.' },
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

export function blockDefinitionOf(blockType: string): BlockDefinition | undefined {
  return BLOCK_BY_ID.get(blockType);
}

export function isValidBlockType(blockType: string): boolean {
  return BLOCK_BY_ID.has(blockType);
}

export interface TreeStats {
  totalBlocks: number;
  maxDepth: number;
  groupIds: GroupId[];
}

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
