import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages with custom domain (root)
  base: '/',
  assetsInclude: ['**/*.JPEG', '**/*.JPG', '**/*.HEIC', '**/*.heic', '**/*.jpeg', '**/*.jpg'],
});
