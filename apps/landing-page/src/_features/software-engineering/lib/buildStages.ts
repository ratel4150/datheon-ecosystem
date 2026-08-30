// _features/software-engineering/lib/buildStages.ts
export interface BuildStageDefinition {
  id: string;
  title: string;
  narrative: string;
  nodes: string[];
}

export const BUILD_STAGES: BuildStageDefinition[] = [
  {
    id: 'foundation',
    title: 'Un servicio',
    narrative: 'Todo sistema real empieza simple — pero bien construido desde el día uno.',
    nodes: ['API REST'],
  },
  {
    id: 'scale',
    title: 'Escala horizontal',
    narrative: 'Cuando crece la demanda, el sistema se reparte solo, sin puntos únicos de falla.',
    nodes: ['Load Balancer', 'Servicio A', 'Servicio B', 'Servicio C'],
  },
  {
    id: 'persist',
    title: 'Persistencia',
    narrative: 'Los datos viven en el lugar correcto, y lo que se repite se sirve al instante.',
    nodes: ['Base de Datos', 'Caché'],
  },
  {
    id: 'communicate',
    title: 'Comunicación desacoplada',
    narrative: 'Los servicios se avisan entre sí sin depender directamente uno del otro.',
    nodes: ['Cola de Eventos'],
  },
  {
    id: 'observe',
    title: 'Observabilidad',
    narrative: 'Si algo falla, lo sabemos antes que el usuario.',
    nodes: ['Métricas', 'Logs', 'Alertas'],
  },
  {
    id: 'ship',
    title: 'Entrega continua',
    narrative: 'Cada cambio se prueba y se despliega solo — sin procesos manuales que rompan cosas.',
    nodes: ['CI/CD', 'Tests Automatizados'],
  },
];
