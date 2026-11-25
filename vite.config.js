import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import business from './src/config/business.js'

const escape = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Writes the page title, description and link-preview tags (Open Graph,
 * used by WhatsApp, Facebook, iMessage…) straight into index.html, from
 * src/config/business.js. Link previews don't run JavaScript, so these
 * must be in the HTML itself.
 */
function socialMeta() {
  return {
    name: 'social-meta',
    transformIndexHtml(html) {
      const { seo, name, language, theme } = business
      const siteUrl = (seo.url || '').replace(/\/$/, '')
      const absolute = (src) => (!src || /^https?:\/\//.test(src) ? src : `${siteUrl}${src}`)
      const image = seo.shareImage
      const locale = (language || 'pt-PT').replace('-', '_')

      const tags = [
        siteUrl && `<link rel="canonical" href="${escape(siteUrl)}/" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escape(name)}" />`,
        `<meta property="og:locale" content="${escape(locale)}" />`,
        `<meta property="og:title" content="${escape(seo.title)}" />`,
        `<meta property="og:description" content="${escape(seo.description)}" />`,
        siteUrl && `<meta property="og:url" content="${escape(siteUrl)}/" />`,
        image?.src && `<meta property="og:image" content="${escape(absolute(image.src))}" />`,
        image?.width && `<meta property="og:image:width" content="${image.width}" />`,
        image?.height && `<meta property="og:image:height" content="${image.height}" />`,
        image?.alt && `<meta property="og:image:alt" content="${escape(image.alt)}" />`,
        `<meta name="twitter:card" content="${image?.src ? 'summary_large_image' : 'summary'}" />`,
        `<meta name="twitter:title" content="${escape(seo.title)}" />`,
        `<meta name="twitter:description" content="${escape(seo.description)}" />`,
        image?.src && `<meta name="twitter:image" content="${escape(absolute(image.src))}" />`,
      ].filter(Boolean)

      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(seo.title)}</title>`)
        .replace('<meta name="description" content="" />', `<meta name="description" content="${escape(seo.description)}" />`)
        .replace('<meta name="theme-color" content="" />', `<meta name="theme-color" content="${escape(theme.background)}" />`)
        .replace('</head>', `  ${tags.join('\n    ')}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), socialMeta()],
})
