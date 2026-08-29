'use client';

import { Box, Container, Typography, Button, Collapse, Stack, GlobalStyles } from '@mui/material';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { DISPLAY, MONO, STACK, STACK_LAYERS, content, resolveLang } from '../../lib';
import { useTechnologyStack } from '../../model';
import { StackNode } from '../StackNode';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function TechnologyStackMobile({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { activeLayerId, selectedTechId, selectLayer, selectTech } = useTechnologyStack(STACK_LAYERS[0].id);

  return (
    <Box component="section" sx={{ bgcolor: STACK.bg, py: 8 }}>
      <GlobalStyles styles={{ '.ts-focus:focus-visible': { outline: `2px solid ${STACK.accent}`, outlineOffset: 2 } }} />
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', color: STACK.accent, mb: 1 }}>{t.kicker}</Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.5rem', color: STACK.text, mb: 1, letterSpacing: '-0.02em' }}>{t.title}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: STACK.textMid }}>{t.subtitle}</Typography>
        </Box>

        <Stack spacing={1.25}>
          {STACK_LAYERS.map((layer) => {
            const open = activeLayerId === layer.id;
            return (
              <Box key={layer.id} sx={{ border: `1px solid ${open ? STACK.accentLine : STACK.border}`, borderRadius: '12px', bgcolor: open ? STACK.surfaceActive : STACK.surface, overflow: 'hidden' }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => selectLayer(open ? ('' as never) : layer.id)}
                  className="ts-focus"
                  sx={{ width: '100%', appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, textAlign: 'left' }}
                >
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700, color: open ? STACK.accent : STACK.textMute }}>{layer.number}</Typography>
                    <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.9rem', color: STACK.text }}>{layer.label}</Typography>
                  </Stack>
                  <Box sx={{ color: STACK.textMute, display: 'flex' }}>{open ? <FiMinus size={14} /> : <FiPlus size={14} />}</Box>
                </Box>
                <Collapse in={open} timeout={200} unmountOnExit>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: STACK.textMute, mb: 1.25 }}>{layer.description}</Typography>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                      {layer.techs.map((tech) => (
                        <StackNode key={tech.id} tech={tech} selected={selectedTechId === tech.id} onSelect={(id) => selectTech(layer.id, id)} />
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 5, pt: 4, borderTop: `1px solid ${STACK.border}` }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.1rem', color: STACK.text, mb: 2 }}>{t.closingHeadline}</Typography>
          <Button
            variant="contained"
            endIcon={<FiArrowRight size={14} />}
            className="ts-focus"
            sx={{ bgcolor: STACK.accent, color: '#031018', fontWeight: 700, fontSize: '0.8rem', px: 2.5, py: 1, borderRadius: '10px', textTransform: 'none', fontFamily: MONO }}
          >
            {t.closingCta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
