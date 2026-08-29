'use client';

import { Box, Container, Typography, Button, Collapse, Stack, GlobalStyles, alpha } from '@mui/material';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, STACK_LAYERS, content, resolveLang } from '../../lib';
import { useTechnologyStack } from '../../model';
import { StackNode } from '../StackNode';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function TechnologyStackMobile({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const { activeLayerId, selectedTechId, selectLayer, selectTech } = useTechnologyStack(STACK_LAYERS[0].id);

  return (
    <Box component="section" sx={{ bgcolor: T.bg, py: 8, transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.ts-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.16em', color: T.text, mb: 1.5 }}>{t.kicker}</Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '2.1rem', color: T.text, mb: 1, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{t.title}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.82rem', color: T.accent, fontWeight: 600 }}>{t.subtitle}</Typography>
        </Box>

        <Stack spacing={1.25}>
          {STACK_LAYERS.map((layer) => {
            const open = activeLayerId === layer.id;
            return (
              <Box key={layer.id} sx={{ border: `1px solid ${open ? T.accentLine : T.border}`, borderRadius: '12px', bgcolor: open ? alpha(T.accent, 0.06) : T.surface, overflow: 'hidden', transition: 'border-color 0.2s ease, background-color 0.2s ease' }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => selectLayer(open ? ('' as never) : layer.id)}
                  className="ts-focus"
                  sx={{ width: '100%', appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, textAlign: 'left' }}
                >
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700, color: open ? T.accent : T.textMute }}>{layer.number}</Typography>
                    <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.9rem', color: T.text }}>{layer.label}</Typography>
                  </Stack>
                  <Box sx={{ color: T.textMute, display: 'flex' }}>{open ? <FiMinus size={14} /> : <FiPlus size={14} />}</Box>
                </Box>
                <Collapse in={open} timeout={200} unmountOnExit>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: T.textMute, mb: 1.25 }}>{layer.description}</Typography>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                      {layer.techs.map((tech) => (
                        <StackNode key={tech.id} tech={tech} selected={selectedTechId === tech.id} T={T} onSelect={(id) => selectTech(layer.id, id)} />
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 5, pt: 4, borderTop: `1px solid ${T.border}` }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.1rem', color: T.text, mb: 2 }}>{t.closingHeadline}</Typography>
          <Button
            variant="contained"
            endIcon={<FiArrowRight size={14} />}
            className="ts-focus"
            sx={{ bgcolor: T.accent, color: '#fff', fontWeight: 700, fontSize: '0.8rem', px: 2.5, py: 1, borderRadius: '10px', textTransform: 'none', fontFamily: MONO, '&:hover': { bgcolor: T.accentDk } }}
          >
            {t.closingCta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
