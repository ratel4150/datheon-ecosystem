'use client';

import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { DISPLAY, MONO } from '../lib';
import { useNewsletterForm } from '../model';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  accentDk: string;
  surface: string;
  border: string;
}

interface FooterNewsletterProps {
  title: string;
  body: string;
  placeholder: string;
  buttonLabel: string;
  thanksLabel: string;
  T: Tokens;
}

export function FooterNewsletter({ title, body, placeholder, buttonLabel, thanksLabel, T }: FooterNewsletterProps) {
  const { email, setEmail, submitted, handleSubmit } = useNewsletterForm();

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', textAlign: 'center' }}>
      <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', color: T.text, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: T.textMute, mb: 2 }}>{body}</Typography>

      {submitted ? (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 0.75 }}>
          <FiCheck size={15} color={T.accent} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.8rem', color: T.accent, fontWeight: 600 }}>{thanksLabel}</Typography>
        </Stack>
      ) : (
        <Stack component="form" onSubmit={handleSubmit} direction="row" sx={{ gap: 1 }}>
          <TextField
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            size="small"
            fullWidth
            className="ft-focus"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: T.surface,
                fontFamily: MONO,
                fontSize: '0.82rem',
                borderRadius: '8px',
                '& fieldset': { borderColor: T.border },
                '&:hover fieldset': { borderColor: T.accent },
                '&.Mui-focused fieldset': { borderColor: T.accent },
              },
              '& .MuiOutlinedInput-input': { color: T.text },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<FiArrowRight size={13} />}
            sx={{
              bgcolor: T.accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.78rem',
              px: 2,
              borderRadius: '8px',
              textTransform: 'none',
              fontFamily: MONO,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': { bgcolor: T.accentDk },
            }}
          >
            {buttonLabel}
          </Button>
        </Stack>
      )}
    </Box>
  );
}
