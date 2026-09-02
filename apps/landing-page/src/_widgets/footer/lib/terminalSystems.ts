// _widgets/footer/lib/terminalSystems.ts
export interface TerminalSystem {
  id: string;
  label: string;
  subTechs: string[];
}

export const TERMINAL_SYSTEMS: TerminalSystem[] = [
  { id: 'software', label: 'SOFTWARE', subTechs: ['Web', 'Mobile', 'APIs', 'Enterprise Software'] },
  { id: 'ai', label: 'AI', subTechs: ['Generative AI', 'Agents', 'RAG', 'Computer Vision', 'ML'] },
  { id: 'agents', label: 'AGENTS', subTechs: ['AI Agents', 'MCP', 'A2A', 'Multi-Agent Systems'] },
  { id: 'infrastructure', label: 'INFRASTRUCTURE', subTechs: ['Cloud', 'Kubernetes', 'CI/CD', 'GPU'] },
  { id: 'iot', label: 'IoT', subTechs: ['Sensors', 'Edge AI', 'PLC', 'Robotics'] },
  { id: 'labs', label: 'LABS', subTechs: ['Proof of Concept', 'Experimental Tech', 'R&D'] },
];
