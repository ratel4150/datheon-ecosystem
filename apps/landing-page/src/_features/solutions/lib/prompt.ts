// _features/solutions/lib/prompt.ts
import { BLOCKS, GROUPS } from './blocks';

export function buildArchitecturePrompt(pathLabel: string, subOptionLabel: string): { system: string; user: string } {
  const catalog = GROUPS.map((group) => {
    const items = BLOCKS.filter((b) => b.group === group.id).map((b) => `${b.id} (${b.label})`);
    return `${group.label}:\n- ${items.join('\n- ')}`;
  }).join('\n\n');

  const system = `Eres un arquitecto de software senior. Tu única tarea es diseñar una arquitectura de referencia usando EXCLUSIVAMENTE los siguientes 32 tipos de bloque (usa el id en mayúsculas EXACTO, nunca inventes uno nuevo):

${catalog}

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, con esta forma exacta:

{
  "root": {
    "blockType": "UNO_DE_LOS_32_IDS",
    "label": "Nombre corto en español (máx. 4 palabras)",
    "children": [
      { "blockType": "OTRO_ID", "label": "...", "children": [] }
    ]
  }
}

Reglas:
- "blockType" debe ser exactamente uno de los 32 ids listados arriba.
- "children" es opcional; represéntalo como árbol (contención/flujo), no como grafo con ciclos.
- Usa entre 6 y 14 bloques en total, con una profundidad razonable (máximo 4 niveles).
- "label" siempre en español, corto y concreto (ej. "Servicio de pedidos", no "Microservicio genérico").
- No agregues explicaciones, comentarios ni texto fuera del JSON.`;

  const user = `El usuario eligió el camino "${pathLabel}" y quiere específicamente: "${subOptionLabel}". Diseña la arquitectura de referencia para este caso.`;

  return { system, user };
}
