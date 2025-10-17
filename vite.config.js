import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages project site
  base: '/Wedding/',
  assetsInclude: ['**/*.JPEG', '**/*.JPG', '**/*.HEIC', '**/*.heic', '**/*.jpeg', '**/*.jpg'],
});
