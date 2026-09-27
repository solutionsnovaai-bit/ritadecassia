import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Endereço público do site, usado nas tags de compartilhamento (WhatsApp, Instagram, Google).
 * Ordem: VITE_SITE_URL (se você definir) → domínio de produção da Vercel → endereço padrão.
 */
function siteOrigin(mode: string) {
  const env = loadEnv(mode, '.', 'VITE_')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const raw = env.VITE_SITE_URL || (vercel ? `https://${vercel}` : 'https://rita-de-cassia.vercel.app')
  const url = new URL(raw)
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS.')
  return url.origin
}

export default defineConfig(({ mode }) => {
  const origin = siteOrigin(mode)
  return {
    plugins: [react(), tailwindcss(), {
      name: 'rita-metadados-sociais',
      transformIndexHtml: (html: string) => html.replaceAll('__SITE_ORIGIN__', origin),
    }],
    define: { __SITE_ORIGIN__: JSON.stringify(origin) },
    server: { host: '0.0.0.0', port: 4173, strictPort: true },
    build: { target: 'es2022', sourcemap: false, cssCodeSplit: false },
  }
})
