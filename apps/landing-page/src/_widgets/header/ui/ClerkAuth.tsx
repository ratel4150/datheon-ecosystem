// File: apps/landing-page/src/_widgets/header/ui/ClerkAuth.tsx
'use client';

import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Button, Box } from '@mui/material';

interface ClerkAuthProps {
  lang: string;
}

export function ClerkAuth({ lang }: ClerkAuthProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="text"
            size="small"
            sx={{
              color: '#4A5068',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { color: '#00AEEF', bgcolor: 'rgba(0,174,239,0.07)' },
            }}
          >
            {lang === 'es' ? 'Iniciar Sesión' : lang === 'en' ? 'Login' : 'Se connecter'}
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#00AEEF',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '10px',
              px: 2.25,
              py: 0.85,
              fontSize: '0.85rem',
              boxShadow: '0 2px 8px rgba(0,174,239,0.35)',
              '&:hover': {
                bgcolor: '#0095cc',
                boxShadow: '0 4px 14px rgba(0,174,239,0.45)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {lang === 'es' ? 'Registrarse' : lang === 'en' ? 'Sign Up' : "S'inscrire"}
          </Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
              userButtonPopoverCard: 'shadow-xl',
            },
          }}
        />
      </SignedIn>
    </Box>
  );
}
