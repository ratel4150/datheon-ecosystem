'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, ACADEMY_URL, content, resolveLang } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function AcademyTeaser({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="sm">
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          sx={{
            textAlign: 'center',
            bgcolor: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: '20px',
            px: { xs: 3, sm: 5 },
            py: { xs: 5, sm: 6 },
          }}
        >
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: T.accent }}>{t.kicker}</Typography>
          </Box>

          <Box component={motion.div} variants={itemVariants} sx={{ mb: 2 }}>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.1rem' }, color: T.text, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {t.titleLine1}
              <Box component="span" sx={{ display: 'block' }}>
                {t.titleLine2Lead}
                <Box component="span" sx={{ color: T.accent }}>
                  {t.titleLine2Accent}
                </Box>
              </Box>
            </Typography>
          </Box>

          <Box component={motion.div} variants={itemVariants} sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.95rem', color: T.textMute, lineHeight: 1.7, maxWidth: 420, mx: 'auto' }}>{t.subtitle}</Typography>
          </Box>

          <Box component={motion.div} variants={itemVariants} sx={{ mb: 3.5 }}>
            <Stack spacing={1} sx={{ alignItems: 'flex-start', display: 'inline-flex' }}>
              {t.highlights.map((h) => (
                <Stack key={h} direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                  <FiCheck size={14} color={T.accent} />
                  <Typography sx={{ fontSize: '0.85rem', color: T.textMid }}>{h}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box component={motion.div} variants={itemVariants}>
            <Button
              variant="contained"
              size="large"
              href={ACADEMY_URL}
              component={motion.a}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              endIcon={<FiArrowRight size={15} />}
              sx={{
                bgcolor: T.accent,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                px: 3.5,
                py: 1.3,
                borderRadius: '12px',
                textTransform: 'none',
                fontFamily: MONO,
                '&:hover': { bgcolor: T.accentDk },
              }}
            >
              {t.cta}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
