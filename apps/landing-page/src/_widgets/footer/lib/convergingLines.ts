// _widgets/footer/lib/convergingLines.ts
export interface ConvergingLabel {
  id: string;
  label: string;
  x: number;
}

export const CONVERGE_VIEWBOX = { width: 800, height: 150 };
export const CONVERGE_POINT = { x: 400, y: 140 };

const LABELS = ['AI', 'AGENTS', 'SOFTWARE', 'DATA', 'CLOUD', 'IoT', 'AUTOMATION', 'HARDWARE'];

export const CONVERGING_LABELS: ConvergingLabel[] = LABELS.map((label, i) => ({
  id: label.toLowerCase(),
  label,
  x: 60 + i * ((CONVERGE_VIEWBOX.width - 120) / (LABELS.length - 1)),
}));
