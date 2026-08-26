'use client';

import { useMemo } from 'react';
import { Box, Container, Grid, GlobalStyles } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, content, resolveLang, NODES, EDGES, connectedLabels, computeNarrative, type NodeId } from '../lib';
import { useEcosystem } from '../model';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { EcosystemHeader } from './EcosystemHeader';
import { EcosystemPanel } from './EcosystemPanel';
import { EcosystemCoreCard } from './EcosystemCoreCard';
import { EcosystemNodeCard } from './EcosystemNodeCard';
import { EcosystemCta } from './EcosystemCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

const CARD_BASE = 0.25;
const DEPTH_STEP = 0.1;

export function Ecosystem({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem<NodeId>();
  const toggleSelect = (id: NodeId) => selectNode(selectedNode === id ? null : id);

  const depthMap = useMemo(() => computeNarrative(NODES, EDGES, 'core'), []);
  const maxDepth = useMemo(() => Math.max(0, ...Array.from(depthMap.values())), [depthMap]);
  const nodeDelay = (id: NodeId) => CARD_BASE + ((depthMap.get(id) ?? 1) - 1) * DEPTH_STEP;
  const ctaDelay = CARD_BASE + maxDepth * DEPTH_STEP + 0.35;

  const satelliteNodes = NODES.filter((n) => n.id !== 'core');

  const activeId = hoveredNode ?? selectedNode;
  const statusText = activeId
    ? (() => {
        const activeNode = NODES.find((n) => n.id === activeId);
        const count = connectedLabels(activeId, EDGES, NODES).length;
        return `${activeNode?.label} · ${count} ${t.connectionsWord.toUpperCase()}`;
      })()
    : `${satelliteNodes.length} ${t.nodesWord.toUpperCase()} · ${EDGES.length} ${t.connectionsWord.toUpperCase()}`;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: T.bg,
        overflow: 'hidden',
        py: { xs: 8, md: 10 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles styles={{ '.eco-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: -2 } }} />
      <EcosystemBackdrop accent={T.accent} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
          <EcosystemCoreCard accent={T.accent} accentDk={T.accentDk} accentBg={T.accentBg} glow={T.glow} surface={T.bg} text={T.text} isDark={isDark} />

          <Grid container spacing={2}>
            {satelliteNodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isDimmed = !!hoveredNode && hoveredNode !== node.id && selectedNode !== node.id;
              return (
                <Grid item xs={12} sm={6} md={4} key={node.id}>
                  <EcosystemNodeCard
                    node={node}
                    connections={connectedLabels(node.id, EDGES, NODES)}
                    connectsWithLabel={t.connectsWith}
                    isSelected={isSelected}
                    isDimmed={isDimmed}
                    T={T}
                    onHover={hoverNode}
                    onToggle={toggleSelect}
                    delay={nodeDelay(node.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </EcosystemPanel>

        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 5 } }}>
          <EcosystemCta label={t.cta} accentColor={T.accent} accentDkColor={T.accentDk} delay={ctaDelay} />
        </Box>
      </Container>
    </Box>
  );
}
