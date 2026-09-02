// _features/software-engineering/lib/systemGraph.ts

export type BranchId = 'root' | 'frontend' | 'backend' | 'data' | 'infra';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: number;
  branch: BranchId;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
}

export const BRANCH_COLORS: Record<BranchId, string> = {
  root: '',
  frontend: '#1971C2',
  backend: '#6C5CE7',
  data: '#0CA678',
  infra: '#F08C00',
};

/** El árbol real: 1 raíz + 4 áreas + 12 subáreas + 35 tecnologías = 52
 *  nodos, 51 conexiones. */
const SYSTEM_TREE: TreeNode = {
  id: 'root',
  label: 'IDEA',
  children: [
    {
      id: 'frontend',
      label: 'FRONTEND',
      children: [
        { id: 'web', label: 'Web App', children: [{ id: 'react', label: 'React' }, { id: 'nextjs', label: 'Next.js' }, { id: 'design-system', label: 'Design System' }, { id: 'pwa', label: 'PWA' }] },
        { id: 'mobile', label: 'Mobile App', children: [{ id: 'ios', label: 'iOS' }, { id: 'android', label: 'Android' }] },
        { id: 'realtime', label: 'Interfaces en Vivo', children: [{ id: 'websockets', label: 'WebSockets' }, { id: 'sse', label: 'SSE' }] },
      ],
    },
    {
      id: 'backend',
      label: 'BACKEND',
      children: [
        { id: 'api-gateway', label: 'API Gateway', children: [{ id: 'rest', label: 'REST' }, { id: 'graphql', label: 'GraphQL' }, { id: 'grpc', label: 'gRPC' }] },
        { id: 'auth', label: 'Autenticación', children: [{ id: 'oauth', label: 'OAuth2' }, { id: 'jwt', label: 'JWT' }] },
        { id: 'business-logic', label: 'Lógica de Negocio', children: [{ id: 'nodejs', label: 'Node.js' }, { id: 'python', label: 'Python' }, { id: 'dotnet', label: '.NET' }, { id: 'microservices', label: 'Microservicios' }] },
      ],
    },
    {
      id: 'data',
      label: 'DATA',
      children: [
        { id: 'relational', label: 'Relacional', children: [{ id: 'postgres', label: 'PostgreSQL' }, { id: 'sqlserver', label: 'SQL Server' }, { id: 'mysql', label: 'MySQL' }] },
        { id: 'cache', label: 'Caché', children: [{ id: 'redis', label: 'Redis' }, { id: 'cdn', label: 'CDN' }] },
        { id: 'analytics', label: 'Analítica', children: [{ id: 'warehouse', label: 'Data Warehouse' }, { id: 'bi', label: 'BI' }, { id: 'ml-pipeline', label: 'ML Pipeline' }] },
      ],
    },
    {
      id: 'infra',
      label: 'INFRAESTRUCTURA',
      children: [
        { id: 'cloud', label: 'Cloud', children: [{ id: 'k8s', label: 'Kubernetes' }, { id: 'docker', label: 'Docker' }, { id: 'serverless', label: 'Serverless' }, { id: 'gpu', label: 'GPU' }] },
        { id: 'cicd', label: 'CI/CD', children: [{ id: 'pipelines', label: 'Pipelines' }, { id: 'tests', label: 'Tests Automatizados' }] },
        { id: 'observability', label: 'Observabilidad', children: [{ id: 'metrics', label: 'Métricas' }, { id: 'logs', label: 'Logs' }, { id: 'alerts', label: 'Alertas' }, { id: 'tracing', label: 'Tracing' }] },
      ],
    },
  ],
};

/** Layout radial (sunburst): cada nodo hereda una porción angular de su
 *  padre, dividida entre sus hijos; el radio crece con la profundidad. */
function layoutRadial(tree: TreeNode, centerX: number, centerY: number, radiusStep: number) {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  function visit(node: TreeNode, depth: number, angleStart: number, angleEnd: number, parentId: string | null, branch: BranchId) {
    const angle = (angleStart + angleEnd) / 2 - Math.PI / 2;
    const radius = depth * radiusStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const nodeBranch: BranchId = depth === 1 ? (node.id as BranchId) : branch;

    nodes.push({ id: node.id, label: node.label, x, y, depth, branch: nodeBranch });
    if (parentId) edges.push({ id: `${parentId}__${node.id}`, from: parentId, to: node.id });

    const children = node.children ?? [];
    if (children.length > 0) {
      const slice = (angleEnd - angleStart) / children.length;
      children.forEach((child, i) => visit(child, depth + 1, angleStart + i * slice, angleStart + (i + 1) * slice, node.id, nodeBranch));
    }
  }

  visit(tree, 0, 0, Math.PI * 2, null, 'root');
  return { nodes, edges };
}

const { nodes: GRAPH_NODES, edges: GRAPH_EDGES } = layoutRadial(SYSTEM_TREE, 0, 0, 78);

export { GRAPH_NODES, GRAPH_EDGES };

export function getNode(id: string): GraphNode | undefined {
  return GRAPH_NODES.find((n) => n.id === id);
}
