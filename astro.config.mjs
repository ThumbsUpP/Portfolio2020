import { defineConfig } from 'astro/config';

// Fully static site served from the domain root (https://pcayol.com/).
export default defineConfig({
  site: 'https://pcayol.com',
  output: 'static',
  base: '/',
});
