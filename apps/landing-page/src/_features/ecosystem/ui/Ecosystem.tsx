// File: apps/landing-page/src/_features/ecosystem/ui/Ecosystem.tsx
'use client';

import { Box, Container } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, content, resolveLang, NODES, EDGES, connectedLabels, type NodeId } from '../lib';
import { useEcosystem } from '../model';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { EcosystemHeader } from './EcosystemHeader';
import { EcosystemPanel } from './EcosystemPanel';
import { EcosystemGraphCanvas } from './EcosystemGraphCanvas';
import { EcosystemFlowDetail } from './EcosystemFlowDetail';
import { EcosystemNodeDetail } from './EcosystemNodeDetail';
import { EcosystemCta } from './EcosystemCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function Ecosystem({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem<NodeId>();
  const toggleSelect = (id: NodeId) => selectNode(selectedNode === id ? null : id);

  const activeId = hoveredNode ?? selectedNode;
  const activeNode = activeId ? NODES.find((n) => n.id === activeId) ?? null : null;
  const activeConnections = activeId ? connectedLabels(activeId, EDGES, NODES) : [];

  const statusText = activeNode
    ? `${activeNode.label} · ${activeConnections.length} ${t.connectionsWord.toUpperCase()}`
    : `${NODES.length - 1} ${t.nodesWord.toUpperCase()} · ${EDGES.length} ${t.connectionsWord.toUpperCase()}`;

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <EcosystemBackdrop accent={T.accent} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Izquierda: solo el grafo + detalle de conexiones del nodo activo */}
          <EcosystemPanel
            label={t.panelLabel}
            statusText={statusText}
            accent={T.accent}
            accentDk={T.accentDk}
            surface={T.surface}
            border={T.border}
            textMid={T.textMid}
            isDark={isDark}
          >
            <EcosystemGraphCanvas hoveredNode={hoveredNode} selectedNode={selectedNode} onHover={hoverNode} onToggle={toggleSelect} T={T} />
            <EcosystemNodeDetail node={activeNode} connections={activeConnections} connectsWithLabel={t.connectsWith} emptyHint={t.emptyHint} T={T} />
          </EcosystemPanel>

          {/* Derecha: texto → mapa del nodo seleccionado (si hay) → CTA */}
          <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <EcosystemHeader
              kicker={t.kicker}
              kickerSub={t.kickerSub}
              title={t.title}
              subtitle={t.subtitle}
              textColor={T.text}
              textMuteColor={T.textMute}
              accentColor={T.accent}
              glow={T.glow}
            />

            {selectedNode && (
              <Box sx={{ mb: { xs: 4, md: 5 } }}>
                <EcosystemFlowDetail nodeId={selectedNode} T={T} />
              </Box>
            )}

            <Box sx={{ textAlign: 'center' }}>
              <EcosystemCta label={t.cta} accentColor={T.accent} accentDkColor={T.accentDk} delay={0.3} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}