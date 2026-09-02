// File: apps/landing-page/astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';


export default defineConfig({
   site: 'https://www.datheon.io', // TODO: dominio real
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@/_app': '/src/_app',
        '@/_shared': '/src/_shared',
        '@/_entities': '/src/_entities',
        '@/_features': '/src/_features',
        '@/_widgets': '/src/_widgets',
        '@/_pages': '/src/_pages',
      },
    },
  },
});