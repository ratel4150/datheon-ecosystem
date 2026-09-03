// File: apps/academy/astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://academy.datheon.io',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind()],
  redirects: {
    '/': '/es',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});