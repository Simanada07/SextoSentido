import { useState } from 'react'
import business from '../config/business.js'
import { locationMapsHref, locationPhoneHref } from '../utils/links.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import styles from './Locations.module.css'

export default function Locations() {
  const { locations: l } = business
  const items = l?.items ?? []
  const [region, setRegion] = useState('')
  if (items.length === 0 || l.showSection === false) return null

  const regions = (l.regions ?? []).filter((r) => items.some((it) => it.region === r))
  const visible = region ? items.filter((it) => it.region === region) : items
  const count = (r) => items.filter((it) => it.region === r).length

  return (
    <section id="restaurantes" className="section section--dark" aria-labelledby="locations-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="locations-title" eyebrow={l.eyebrow} title={l.title} intro={l.intro} />
        </Reveal>

        {regions.length > 1 && (
          <div className={styles.filters} role="group" aria-label={l.filterLabel}>
            {[{ id: '', label: l.allLabel, n: items.length }, ...regions.map((r) => ({ id: r, label: r, n: count(r) }))].map(
              (f) => (
                <button
                  key={f.id || 'all'}
                  type="button"
                  aria-pressed={region === f.id}
                  className={`${styles.filter} ${region === f.id ? styles.filterActive : ''}`}
                  onClick={() => setRegion(f.id)}
                >
                  {f.label}
                  <span className={styles.count}>{f.n}</span>
                </button>
              ),
            )}
          </div>
        )}

        <ul className={styles.grid} key={region || 'all'}>
          {visible.map((loc) => {
            const tel = locationPhoneHref(loc)
            const detailed = Boolean(loc.address || tel || loc.hours)
            return (
              <li key={loc.name} className={`${styles.card} ${detailed ? styles.detailed : ''}`}>
                <div className={styles.head}>
                  <span className={styles.region}>{loc.mall ? l.mallLabel : loc.region}</span>
                  <h3 className={styles.name}>{loc.name}</h3>
                  {loc.city && <span className={styles.city}>{loc.city}</span>}
                </div>

                {detailed && (
                  <ul className={styles.details}>
                    {loc.address && (
                      <li>
                        <Icon name="pin" size={18} />
                        <span>{loc.address}</span>
                      </li>
                    )}
                    {loc.hours && (
                      <li>
                        <Icon name="clock" size={18} />
                        <span>{loc.hours}</span>
                      </li>
                    )}
                  </ul>
                )}

                <div className={styles.actions}>
                  <a href={locationMapsHref(loc)} target="_blank" rel="noopener noreferrer" className={styles.action}>
                    <Icon name="pin" size={18} />
                    {l.mapsLabel}
                  </a>
                  {tel && (
                    <a href={tel} className={`${styles.action} ${styles.call}`}>
                      <Icon name="phone" size={18} />
                      {loc.phoneDisplay || l.callLabel}
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
