// _widgets/footer/lib/proofStats.ts

/** Estos valores reflejan datos reales de otras secciones del sitio:
 *  - '6' y '45+' vienen de STACK_LAYERS en _features/technology-stack
 *    (6 capas, 5+8+8+9+8+7 = 45 tecnologías listadas).
 *  - '50+' viene de GRAPH_NODES en _features/software-engineering
 *    (52 nodos reales en el grafo del sistema).
 *  Si el contenido de esas secciones cambia, actualiza estos valores. */
export interface ProofStat {
  id: string;
  value: string;
}

export const PROOF_STATS: ProofStat[] = [
  { id: 'layers', value: '6' },
  { id: 'techs', value: '45+' },
  { id: 'pieces', value: '50+' },
];
