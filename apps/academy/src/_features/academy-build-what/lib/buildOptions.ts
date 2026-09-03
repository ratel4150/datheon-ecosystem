export interface BuildOption { id: string; label: string; description: string; color: string; }

export const BUILD_OPTIONS: BuildOption[] = [
  { id: 'web-app', label: 'UN PRODUCTO WEB', description: 'Un sitio o aplicación que la gente pueda usar de verdad.', color: '#1971C2' },
  { id: 'mobile-app', label: 'UNA APP MÓVIL', description: 'Algo que viva en el bolsillo de alguien.', color: '#0CA678' },
  { id: 'ai-agent', label: 'UN AGENTE DE IA', description: 'Un sistema que razona, decide y actúa por su cuenta.', color: '#D6336C' },
  { id: 'data-project', label: 'UN PROYECTO DE DATOS', description: 'Convertir información en algo que se pueda entender.', color: '#F08C00' },
  { id: 'automation', label: 'UNA AUTOMATIZACIÓN', description: 'Que una máquina haga el trabajo repetitivo por ti.', color: '#6C5CE7' },
  { id: 'experimental', label: 'ALGO EXPERIMENTAL', description: 'Todavía no sabes qué — y está bien.', color: '#5F3DC4' },
];
