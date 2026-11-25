import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import business from './config/business.js'
import './styles/global.css'
import App from './App.jsx'

// Apply brand colours and page meta from the config before first paint.
const root = document.documentElement
const { theme, seo } = business
root.style.setProperty('--color-primary', theme.primary)
root.style.setProperty('--color-secondary', theme.secondary)
root.style.setProperty('--color-accent', theme.accent)
root.style.setProperty('--color-ink', theme.ink)
root.style.setProperty('--color-bg', theme.background)
// Optional: light neutral for alternating sections (default: the secondary colour).
if (theme.neutral) root.style.setProperty('--color-neutral', theme.neutral)
// Optional finish, e.g. 'minimal' (see the end of styles/global.css). Default: poster.
if (theme.style) root.dataset.style = theme.style
// Optional: pink for text on light backgrounds, and secondary text colour.
if (theme.pinkText) root.style.setProperty('--color-pink-text', theme.pinkText)
if (theme.muted) root.style.setProperty('--color-muted', theme.muted)
// Optional: highlight colour on dark sections, for brands whose primary is too dark there.
if (theme.highlightOnDark) root.style.setProperty('--color-highlight-dark', theme.highlightOnDark)
// Optional: highlight colour on sections painted in the primary colour (default: ink).
if (theme.highlightOnPrimary) root.style.setProperty('--color-highlight-primary', theme.highlightOnPrimary)

// Optional per-client fonts: theme.fonts = { display, body, googleFontsUrl, displayFallback }
const fonts = theme.fonts
if (fonts) {
  if (fonts.googleFontsUrl) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fonts.googleFontsUrl
    document.head.appendChild(link)
  }
  const displayFallback = fonts.displayFallback || "'Arial Narrow', sans-serif"
  if (fonts.display) root.style.setProperty('--font-display', `'${fonts.display}', ${displayFallback}`)
  if (fonts.body) root.style.setProperty('--font-body', `'${fonts.body}', system-ui, sans-serif`)
}

// Optional per-client tab icon (a file in /public or a data: URL).
if (business.favicon) {
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((l) => (l.href = business.favicon))
}

root.lang = business.language || 'pt-PT'
document.title = seo.title
document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.background)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
