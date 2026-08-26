// _features/system-architecture/lib/data.ts
export const CHAIN = [
  { name: 'SENSOR', desc: 'Donde nace la señal', chips: ['Sensors', 'Cameras', 'Machines', 'IoT'] },
  { name: 'EDGE', desc: 'Procesa cerca del origen', chips: ['ESP32', 'Raspberry Pi', 'Gateways', 'Edge Compute'] },
  { name: 'AI', desc: 'Interpreta y predice', chips: ['LLM', 'RAG', 'Agents', 'Computer Vision'] },
  { name: 'AGENT', desc: 'Decide la siguiente acción', chips: ['Decisions', 'Orchestration', 'Multi-Agent', 'Triggers'] },
  { name: 'SOFTWARE', desc: 'Ejecuta la experiencia', chips: ['Web', 'Mobile', 'SaaS', 'APIs'] },
  { name: 'ERP', desc: 'Sincroniza el negocio', chips: ['SAP', 'Odoo', 'Dynamics', 'Inventory'] },
  { name: 'AUTOMATION', desc: 'Dispara el flujo', chips: ['Workflows', 'Notifications', 'Scheduling', 'Rules'] },
  { name: 'BUSINESS', desc: 'Resultado medible', chips: ['Sales', 'Operations', 'Growth', 'Decisions'] },
] as const;

export const SIGNAL_STEPS = [
  { name: 'SIGNAL', items: ['Sensors', 'Machines', 'IoT'] },
  { name: 'DATA', items: ['APIs', 'Databases', 'Cloud'] },
  { name: 'INTELLIGENCE', items: ['AI', 'ML', 'Vision'] },
  { name: 'DECISION', items: ['AI Agents', 'Rules', 'Analytics'] },
  { name: 'ACTION', items: ['ERP', 'CRM', 'Automation'] },
] as const;

export const ENTER_TOP = ['AI', 'SOFTWARE', 'DATA', 'IoT'] as const;
export const ENTER_BOTTOM = ['CLOUD', 'HARDWARE', 'ERP'] as const;
