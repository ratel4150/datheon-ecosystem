'use client';

import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';
import { DISPLAY, MONO, PILLARS, TECH_CHIPS, SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_WHATSAPP } from '../lib';
import { useNewsletterForm } from '../model';
import { FooterSystemStatus } from './FooterSystemStatus';
import type { FooterPillar } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  accentDk: string;
  surface: string;
  border: string;
}

interface FooterColumnsProps {
  tagline: string;
  pillars: FooterPillar[];
  exploreLabel: string;
  technologyLabel: string;
  connectLabel: string;
  academyLabel: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterThanks: string;
  newsletterError: string;
  systemStatusLabel: string;
  terminalInit: string;
  terminalReady: string;
  T: Tokens;
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
};

export function FooterColumns({
  tagline,
  pillars,
  exploreLabel,
  technologyLabel,
  connectLabel,
  academyLabel,
  newsletterPlaceholder,
  newsletterButton,
  newsletterThanks,
  newsletterError,
  systemStatusLabel,
  terminalInit,
  terminalReady,
  T,
}: FooterColumnsProps) {
  const { email, setEmail, status, handleSubmit } = useNewsletterForm();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1.2fr 1fr 1fr', md: '1.3fr 1fr 1fr 1.2fr' },
        gap: { xs: 4, sm: 3 },
      }}
    >
      {/* Marca */}
      <Box>
        <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.05rem', color: T.text, mb: 0.75 }}>DATHEÓN</Typography>
        <Typography sx={{ fontSize: '0.82rem', color: T.textMute, mb: 2, maxWidth: 220, lineHeight: 1.6 }}>{tagline}</Typography>
        <Stack direction="row" sx={{ gap: 0.75, mb: 2 }}>
          {SOCIAL_LINKS.map((link) => {
            const Icon = SOCIAL_ICONS[link.id];
            if (!Icon) return null;
            return (
              <Box
                key={link.id}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="ft-focus"
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: `1px solid ${T.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: T.textMute,
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  '&:hover': { borderColor: T.accent, color: T.accent },
                }}
              >
                <Icon size={13} />
              </Box>
            );
          })}
        </Stack>
        <FooterSystemStatus toggleLabel={systemStatusLabel} initLabel={terminalInit} readyLabel={terminalReady} T={T} />
      </Box>

      {/* Explorar */}
      <Box>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
          {exploreLabel}
        </Typography>
        <Stack spacing={1}>
          {pillars.map((pillar) => (
            <Typography
              key={pillar.id}
              component="a"
              href={pillar.href}
              className="ft-focus"
              sx={{ fontSize: '0.85rem', color: T.textMid, textDecoration: 'none', '&:hover': { color: T.accent } }}
            >
              {pillar.sub}
            </Typography>
          ))}
          <Typography
            component="a"
            href="/universidad"
            className="ft-focus"
            sx={{ fontSize: '0.85rem', color: T.textMid, textDecoration: 'none', '&:hover': { color: T.accent } }}
          >
            {academyLabel}
          </Typography>
        </Stack>
      </Box>

      {/* Tecnología */}
      <Box>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
          {technologyLabel}
        </Typography>
        <Stack spacing={1}>
          {TECH_CHIPS.map((chip) => (
            <Typography key={chip} sx={{ fontSize: '0.85rem', color: T.textMid }}>
              {chip}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Conecta */}
      <Box>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
          {connectLabel}
        </Typography>

        {status === 'success' ? (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.6, mb: 2 }}>
            <FiCheck size={13} color={T.accent} />
            <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: T.accent, fontWeight: 600 }}>{newsletterThanks}</Typography>
          </Stack>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 2 }}>
            <Stack direction="row" sx={{ gap: 0.75 }}>
              <TextField
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                size="small"
                fullWidth
                error={status === 'error'}
                className="ft-focus"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: MONO,
                    fontSize: '0.78rem',
                    borderRadius: '7px',
                    '& fieldset': { borderColor: status === 'error' ? '#E5484D' : T.border },
                  },
                  '& .MuiOutlinedInput-input': { color: T.text, py: 0.85 },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={status === 'loading'}
                sx={{
                  bgcolor: T.accent,
                  color: '#fff',
                  minWidth: 0,
                  px: 1.25,
                  borderRadius: '7px',
                  '&:hover': { bgcolor: T.accentDk },
                }}
              >
                <FiArrowRight size={13} />
              </Button>
            </Stack>
            {status === 'error' && (
              <Typography role="alert" sx={{ fontFamily: MONO, fontSize: '0.64rem', color: '#E5484D', mt: 0.5 }}>
                {newsletterError}
              </Typography>
            )}
          </Box>
        )}

        <Stack spacing={0.75}>
          <Box
            component="a"
            href={`mailto:${CONTACT_EMAIL}`}
            className="ft-focus"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: T.textMid, fontSize: '0.82rem', '&:hover': { color: T.accent } }}
          >
            <FiMail size={13} /> {CONTACT_EMAIL}
          </Box>
          <Box
            component="a"
            href={CONTACT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="ft-focus"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: T.textMid, fontSize: '0.82rem', '&:hover': { color: T.accent } }}
          >
            <FaWhatsapp size={14} /> WhatsApp
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
