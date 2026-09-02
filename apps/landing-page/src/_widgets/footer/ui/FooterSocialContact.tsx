'use client';

import { Box, Stack, Typography } from '@mui/material';
import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { MONO, SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_WHATSAPP } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  surface: string;
  border: string;
}

interface FooterSocialContactProps {
  title: string;
  T: Tokens;
}

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
};

export function FooterSocialContact({ title, T }: FooterSocialContactProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
        {title}
      </Typography>

      <Stack direction="row" sx={{ justifyContent: 'center', gap: 1, mb: 2 }}>
        {SOCIAL_LINKS.map((link) => {
          const Icon = ICONS[link.id];
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
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: `1px solid ${T.border}`,
                bgcolor: T.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: T.textMute,
                transition: 'border-color 0.2s ease, color 0.2s ease',
                '&:hover': { borderColor: T.accent, color: T.accent },
              }}
            >
              <Icon size={14} />
            </Box>
          );
        })}
      </Stack>

      <Stack direction="row" sx={{ justifyContent: 'center', gap: 2.5, flexWrap: 'wrap' }}>
        <Box
          component="a"
          href={`mailto:${CONTACT_EMAIL}`}
          className="ft-focus"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            textDecoration: 'none',
            color: T.textMute,
            fontFamily: MONO,
            fontSize: '0.78rem',
            transition: 'color 0.2s ease',
            '&:hover': { color: T.accent },
          }}
        >
          <FiMail size={14} />
          {CONTACT_EMAIL}
        </Box>
        <Box
          component="a"
          href={CONTACT_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="ft-focus"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            textDecoration: 'none',
            color: T.textMute,
            fontFamily: MONO,
            fontSize: '0.78rem',
            transition: 'color 0.2s ease',
            '&:hover': { color: T.accent },
          }}
        >
          <FaWhatsapp size={15} />
          WhatsApp
        </Box>
      </Stack>
    </Box>
  );
}
