import { useState } from 'react'
import business from '../config/business.js'
import Icon from './ui/Icon.jsx'
import styles from './DemoBanner.module.css'

/** Floating note shown on pitch demos (`demo` in the client config). Hidden when `demo` is absent. */
export default function DemoBanner() {
  const { demo } = business
  const [open, setOpen] = useState(true)
  if (!demo || !open) return null

  return (
    <aside className={styles.banner} aria-label={demo.label}>
      <p className={styles.text}>
        <strong>{demo.label}</strong> {demo.text}
      </p>
      {demo.cta?.href && (
        <a href={demo.cta.href} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          <Icon name="whatsapp" size={18} />
          {demo.cta.label}
        </a>
      )}
      <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={demo.closeLabel}>
        <Icon name="close" size={18} />
      </button>
    </aside>
  )
}
