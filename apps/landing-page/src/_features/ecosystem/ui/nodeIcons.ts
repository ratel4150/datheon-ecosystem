// File: apps/landing-page/src/_features/ecosystem/ui/nodeIcons.ts
// File: apps/landing-page/src/_features/ecosystem/ui/nodeIcons.ts
'use client';

import type { IconType } from 'react-icons';
import {
  FiCpu, FiCode, FiZap, FiDatabase, FiCloud, FiWifi, FiRadio, FiUsers,
  FiMonitor, FiServer, FiTool, FiBox, FiLayers, FiTarget, FiBarChart2,
  FiGitBranch, FiGlobe, FiSmartphone, FiActivity, FiSettings, FiCheckCircle,
  FiCircle,
} from 'react-icons/fi';
import type { NodeData } from '../lib';

// Ícono explícito para core + 7 categorías + 21 subnodos. Los sub-subnodos
// heredan el de su `parent` vía getIcon() — ver abajo.
export const NODE_ICON: Record<string, IconType> = {
  core: FiCpu,
  software: FiCode,
  ai: FiZap,
  data: FiDatabase,
  cloud: FiCloud,
  edge: FiWifi,
  iot: FiRadio,
  agents: FiUsers,

  'software-frontend': FiMonitor,
  'software-backend': FiServer,
  'software-devtools': FiTool,

  'ai-modelos': FiBox,
  'ai-frameworks': FiLayers,
  'ai-capacidades': FiTarget,

  'data-bases-de-datos': FiDatabase,
  'data-analitica': FiBarChart2,
  'data-pipelines': FiGitBranch,

  'cloud-proveedores': FiCloud,
  'cloud-infraestructura': FiServer,
  'cloud-redes': FiGlobe,

  'edge-computo-edge': FiCpu,
  'edge-comunicacion': FiWifi,
  'edge-dispositivos': FiSmartphone,

  'iot-sensores': FiActivity,
  'iot-control-industrial': FiSettings,
  'iot-conectividad': FiRadio,

  'agents-arquitectura': FiLayers,
  'agents-capacidades': FiTarget,
  'agents-evaluacion': FiCheckCircle,
};

export function getIcon(node: NodeData): IconType {
  if (NODE_ICON[node.id]) return NODE_ICON[node.id];
  if (node.parent && NODE_ICON[node.parent]) return NODE_ICON[node.parent];
  return FiCircle;
}