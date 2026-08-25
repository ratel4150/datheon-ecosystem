// _features/hero/lib/constants.ts
import { alpha } from '@mui/material';

export const C = {
  bg:         '#FFFFFF',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
  border:     '#ebebeb',
  statsB:     '#F4FAFE',
} as const;

export const DISPLAY = 'Poppins, sans-serif';
export const MONO = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

export const BRANCHES = [
  { id: 'software', label: 'SOFTWARE', chips: ['SaaS', 'Web', 'Mobile', 'E-commerce'] },
  { id: 'ai',        label: 'AI',       chips: ['Agents', 'Swarms', 'Local AI', 'RAG'] },
  { id: 'hardware',  label: 'HARDWARE', chips: ['GPU', 'IoT', 'Edge', 'PLC'] },
] as const;
