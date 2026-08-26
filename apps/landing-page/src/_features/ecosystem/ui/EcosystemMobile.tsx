'use client';

import { Box, Container, Accordion, AccordionSummary, AccordionDetails, GlobalStyles, alpha } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { C, DARK, MONO, content, resolveLang, NODES } from '../lib';
import { useTheme } from '@/_shared/lib/theme';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { EcosystemHeader } from './EcosystemHeader';
import { EcosystemCta } from './EcosystemCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function EcosystemMobile({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: T.bg,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles styles={{ '.eco-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 3 } }} />
      <EcosystemBackdrop accent={T.accent} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <EcosystemHeader
          kicker={t.kicker}
          title={t.title}
          subtitle={t.subtitle}
          textColor={T.text}
          textMuteColor={T.textMute}
          accentColor={T.accent}
          glow={T.glow}
          titleSize={{ xs: '1.8rem', md: '1.8rem' }}
          mb={{ xs: 4, md: 4 }}
        />

        <Box>
          {NODES.filter((n) => n.id !== 'core').map((node) => (
            <Accordion
              key={node.id}
              sx={{
                bgcolor: 'transparent',
                color: T.text,
                boxShadow: 'none',
                borderBottom: `1px solid ${T.border}`,
                '&:before': { display: 'none' },
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: T.accent }} />}
                className="eco-focus"
                sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em' }}
              >
                {node.label}
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {node.metadata.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        bgcolor: alpha(T.accent, 0.1),
                        border: `1px solid ${T.accentLine}`,
                        fontFamily: MONO,
                        fontSize: '0.65rem',
                        color: T.textMute,
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <EcosystemCta label={t.cta} accentColor={T.accent} accentBg={T.accentBg} delay={0.3} />
        </Box>
      </Container>
    </Box>
  );
}
