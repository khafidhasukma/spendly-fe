import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import type { PluginOption } from 'vite';

function htmlEnvPlugin(): PluginOption {
  return {
    name: 'html-env-replace',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const env = loadEnv(ctx.server?.config?.mode ?? 'production', process.cwd(), 'VITE_');
        return html.replace(/%(\w+)%/g, (_, key) => env[key] ?? '');
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), htmlEnvPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
