import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://celine-dion-concert-2027.example.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
