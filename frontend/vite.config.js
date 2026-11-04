import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" precisa ser o nome do repositório para funcionar no GitHub Pages
// (https://<usuario>.github.io/BirthdayList/)
export default defineConfig({
  plugins: [react()],
  base: '/BirthdayList/',
  // O .env fica na raiz do repositório
  envDir: '..',
  resolve: {
    // A pasta backend/ fica fora de frontend/, então os pacotes importados
    // por ela (firebase) precisam ser resolvidos a partir de frontend/node_modules
    dedupe: ['firebase'],
  },
  server: {
    // Permite ao servidor de desenvolvimento servir arquivos de ../backend
    fs: { allow: ['..'] },
  },
});
