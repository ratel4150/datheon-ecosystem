import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://academy.datheon.io', // TODO: confirmar subdominio/ruta real de producción
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
