# @datheon/auth

Wrapper de `@clerk/clerk-react` (misma librería que ya usa landing-page —
no `@clerk/astro`, que era una suposición mía anterior sin confirmar).

## Multi-dominio / cuenta compartida entre apps

Si Academy (y futuras apps: dashboard, labs, builder...) deben compartir
una sola cuenta de usuario con landing-page:

1. En el dashboard de Clerk, configura el dominio de landing-page como
   **dominio primario** y cada subdominio nuevo (academy.datheon.io,
   dashboard.datheon.io...) como **dominio satélite** del mismo Clerk App.
2. Usa el **mismo** `PUBLIC_CLERK_PUBLISHABLE_KEY` en el `.env` de cada
   app — es lo que los conecta como una sola identidad, no el código.

Si en cambio cada app debe tener usuarios independientes, cada una
necesita su propio Clerk App (publishable key distinta) — sin
configuración de satélites.

**Pendiente de decidir por el negocio**, no por código: ¿Academy
comparte cuenta con landing-page o es independiente?

## Uso

\`\`\`tsx
import { ClerkProvider } from '@datheon/auth';

<ClerkProvider>
  {children}
</ClerkProvider>
\`\`\`

Si `PUBLIC_CLERK_PUBLISHABLE_KEY` no está configurado, el provider
renderiza los children sin autenticación (con un warning en consola) —
mismo comportamiento defensivo que ya tenía landing-page.
