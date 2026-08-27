// _features/solutions/lib/paths.ts
export type PathId = 'construir' | 'automatizar' | 'inteligencia' | 'conectar' | 'escalar' | 'transformar';

export interface SubOption {
  id: string;
  label: string;
}

export interface PathDefinition {
  id: PathId;
  label: string;
  description: string;
  color: string;
  subOptions: SubOption[];
}

export const PATHS: PathDefinition[] = [
  {
    id: 'construir',
    label: 'CONSTRUIR',
    description: 'Necesito crear algo nuevo.',
    color: '#6C5CE7',
    subOptions: [
      { id: 'producto-digital', label: 'Lanzar un producto digital' },
      { id: 'plataforma', label: 'Construir una plataforma' },
      { id: 'app-movil', label: 'Crear una app móvil' },
      { id: 'modernizar', label: 'Modernizar software existente' },
    ],
  },
  {
    id: 'automatizar',
    label: 'AUTOMATIZAR',
    description: 'Quiero eliminar trabajo manual.',
    color: '#0CA678',
    subOptions: [
      { id: 'procesos-internos', label: 'Automatizar procesos internos' },
      { id: 'tareas-repetitivas', label: 'Reducir tareas repetitivas' },
      { id: 'orquestar-flujos', label: 'Orquestar flujos entre equipos' },
      { id: 'rpa', label: 'Conectar RPA con mis sistemas' },
    ],
  },
  {
    id: 'inteligencia',
    label: 'INTELIGENCIA',
    description: 'Quiero incorporar IA.',
    color: '#D6336C',
    subOptions: [
      { id: 'agentes', label: 'Crear agentes' },
      { id: 'decisiones', label: 'Automatizar decisiones' },
      { id: 'analizar-info', label: 'Analizar información' },
      { id: 'entender-imagenes', label: 'Entender imágenes' },
    ],
  },
  {
    id: 'conectar',
    label: 'CONECTAR',
    description: 'Mis sistemas no están integrados.',
    color: '#1971C2',
    subOptions: [
      { id: 'crm-erp', label: 'Unificar mi CRM y ERP' },
      { id: 'canales-venta', label: 'Conectar canales de venta' },
      { id: 'pagos', label: 'Integrar pagos' },
      { id: 'iot-software', label: 'Sincronizar IoT con software' },
    ],
  },
  {
    id: 'escalar',
    label: 'ESCALAR',
    description: 'Mi tecnología ya no es suficiente.',
    color: '#E8590C',
    subOptions: [
      { id: 'mas-usuarios', label: 'Soportar más usuarios' },
      { id: 'migrar-nube', label: 'Migrar a la nube' },
      { id: 'rendimiento', label: 'Mejorar el rendimiento' },
      { id: 'alta-disponibilidad', label: 'Garantizar alta disponibilidad' },
    ],
  },
  {
    id: 'transformar',
    label: 'TRANSFORMAR',
    description: 'Tengo una idea o problema y no sé por dónde empezar.',
    color: '#5F3DC4',
    subOptions: [
      { id: 'arquitectura', label: 'Definir la arquitectura correcta' },
      { id: 'poc', label: 'Validar una idea (POC)' },
      { id: 'explorar', label: 'Explorar qué es posible' },
      { id: 'roadmap', label: 'Planear una hoja de ruta' },
    ],
  },
];

export function findPath(id: string): PathDefinition | undefined {
  return PATHS.find((p) => p.id === id);
}
