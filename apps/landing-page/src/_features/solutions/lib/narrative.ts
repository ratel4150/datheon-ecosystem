// _features/solutions/lib/narrative.ts
import { GROUPS, blockDefinitionOf, blockGroupOf, type ArchitectureNode, type GroupId } from './blocks';

export interface NarrativeItem {
  label: string;
  blockLabel: string;
  description: string;
}

export interface NarrativeSection {
  groupId: GroupId;
  groupLabel: string;
  groupColor: string;
  intro: string;
  items: NarrativeItem[];
}

export interface Narrative {
  intro: string;
  sections: NarrativeSection[];
}

const GROUP_INTRO: Record<GroupId, string> = {
  infra: 'La base de todo: dónde y cómo vive tu infraestructura.',
  compute: 'El motor que ejecuta la lógica de tu negocio.',
  data: 'Dónde vive y cómo fluye tu información.',
  traffic: 'Cómo entra, se reparte y se comunica el tráfico dentro del sistema.',
  security: 'La capa que protege todo lo anterior.',
  ops: 'Lo que mantiene todo funcionando, visible y actualizado.',
};

const GROUP_COLOR = new Map(GROUPS.map((g) => [g.id, g.color]));
const GROUP_LABEL = new Map(GROUPS.map((g) => [g.id, g.label]));

export function buildNarrative(tree: ArchitectureNode, pathLabel: string, subOptionLabel: string): Narrative {
  const order: GroupId[] = [];
  const byGroup = new Map<GroupId, NarrativeItem[]>();

  function walk(node: ArchitectureNode) {
    const group = blockGroupOf(node.blockType);
    const def = blockDefinitionOf(node.blockType);
    if (group && def) {
      if (!byGroup.has(group)) {
        byGroup.set(group, []);
        order.push(group);
      }
      const items = byGroup.get(group)!;
      if (!items.some((it) => it.blockLabel === def.label)) {
        items.push({ label: node.label, blockLabel: def.label, description: def.description });
      }
    }
    (node.children ?? []).forEach(walk);
  }

  walk(tree);

  const sections: NarrativeSection[] = order.map((groupId) => ({
    groupId,
    groupLabel: GROUP_LABEL.get(groupId) ?? groupId,
    groupColor: GROUP_COLOR.get(groupId) ?? '#8891A6',
    intro: GROUP_INTRO[groupId],
    items: byGroup.get(groupId) ?? [],
  }));

  const intro = `Para "${subOptionLabel}" dentro de ${pathLabel.toLowerCase()}, diseñamos una arquitectura de referencia. Esto es lo que la compone y por qué cada pieza está ahí.`;

  return { intro, sections };
}

/** Versión en texto plano de la narrativa — para copiar al portapapeles. */
export function narrativeToPlainText(narrative: Narrative, pathLabel: string, subOptionLabel: string): string {
  const lines: string[] = [];
  lines.push(`Arquitectura de referencia — ${pathLabel} / ${subOptionLabel}`);
  lines.push('');
  lines.push(narrative.intro);
  lines.push('');

  narrative.sections.forEach((section) => {
    lines.push(section.groupLabel.toUpperCase());
    lines.push(section.intro);
    section.items.forEach((item) => {
      lines.push(`  • ${item.label} — ${item.description}`);
    });
    lines.push('');
  });

  lines.push('Generado con Datheón — datheon.com');
  return lines.join('\n');
}
