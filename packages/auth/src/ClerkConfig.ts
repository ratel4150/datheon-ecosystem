// File: packages/auth/src/ClerkConfig.ts
// packages/auth/src/ClerkConfig.ts
// TODO: cada app consumidora debe tener PUBLIC_CLERK_PUBLISHABLE_KEY en
// su propio .env. Si Academy comparte cuenta de usuario con landing-page
// (SSO real vía multi-dominio de Clerk), usa el MISMO valor en ambas —
// eso es lo que las conecta como una sola identidad, no el código.
// File: packages/auth/src/ClerkConfig.ts
export const CLERK_PUBLISHABLE_KEY =
  (import.meta.env?.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined) ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_CLERK_PUBLISHABLE_KEY : undefined);