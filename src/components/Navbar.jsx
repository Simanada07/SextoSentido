import { useEffect, useState } from 'react'
import business from '../config/business.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { nav, wordmark, name, logo } = business
  const showCta = Boolean(nav.cta?.href && nav.cta.showInHeader !== false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape or when the screen gets wide.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 861px)')
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={close} aria-label={`${name} — ${nav.homeLabel}`}>
          {logo?.src && <img src={logo.src} alt="" className={styles.logo} width="52" height="52" />}
          <span className={styles.brandText}>
            <span className={styles.brandSecondary}>{wordmark.secondary}</span>
            {wordmark.tagline && <span className={styles.brandTagline}>{wordmark.tagline}</span>}
          </span>
        </a>

        <nav className={styles.desktopLinks} aria-label={nav.mainNavLabel}>
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {showCta && (
            <Button href={nav.cta.href} size="sm" className={styles.cta}>
              {nav.cta.label}
            </Button>
          )}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuCloseLabel : nav.menuOpenLabel}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.panel} ${open ? styles.panelOpen : ''}`} hidden={!open}>
        <nav className="container" aria-label={nav.mobileNavLabel}>
          <ul className={styles.mobileList}>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.mobileLink} onClick={close}>
                  {link.label}
                  <Icon name="arrow" size={22} />
                </a>
              </li>
            ))}
          </ul>
          {showCta && (
            <Button href={nav.cta.href} className={styles.mobileCta} onClick={close}>
              {nav.cta.label}
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
