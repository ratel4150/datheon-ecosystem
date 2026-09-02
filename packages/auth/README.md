# @datheon/auth

Scaffold pendiente de credenciales reales de Clerk.

## Antes de usar este paquete en cualquier app:

1. En el dashboard de Clerk, configura **Satellite domains** (multi-dominio):
   marca `landing-page` (o el dominio raíz, ej. datheon.io) como dominio
   primario, y cada app nueva (academy.datheon.io, dashboard.datheon.io...)
   como dominio satélite del mismo Clerk App — así una sola cuenta de
   usuario funciona en todas ("SSO real" entre tus apps).
2. Instala `@clerk/astro` (o el SDK correspondiente al framework de cada
   app) como dependencia de esa app específica — este paquete NO lo trae
   como dependencia directa, cada app decide su versión.
3. Rellena `src/ClerkConfig.ts` con las claves reales (`PUBLISHABLE_KEY`,
   `SECRET_KEY`) vía variables de entorno — nunca hardcodeadas.

Hasta que eso exista, `src/index.ts` exporta un `ClerkConfig` vacío a
propósito — no hay credenciales falsas en este paquete.
