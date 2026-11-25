import business from '../config/business.js'
import Button from './ui/Button.jsx'
import Highlight from './ui/Highlight.jsx'
import Icon from './ui/Icon.jsx'
import styles from './Hero.module.css'

const isExternal = (href = '') => href.startsWith('http')

export default function Hero() {
  const { hero } = business
  const infoBar = hero.infoBar ?? []

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg}>
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          fetchPriority="high"
          decoding="async"
          style={hero.image.position ? { '--hero-position': hero.image.position } : undefined}
        />
        {/* Rotating seal (decorative; its words already appear elsewhere on the page) */}
        {hero.seal?.ring && (
          <div className={styles.seal} aria-hidden="true">
            <svg viewBox="0 0 200 200" className={styles.sealRing}>
              <defs>
                <path id="hero-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#hero-seal-path" textLength="486" lengthAdjust="spacing">
                  {hero.seal.ring}
                </textPath>
              </text>
            </svg>
            {hero.seal.center && <span className={styles.sealCenter}>{hero.seal.center}</span>}
          </div>
        )}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</span>
          <h1 id="hero-title" className={styles.title}>
            <Highlight text={hero.headline} />
          </h1>
          <p className={styles.sub}>{hero.subheadline}</p>

          <div className={styles.ctas}>
            <Button href={hero.primaryCta.href} icon={<Icon name="arrow" />}>
              {hero.primaryCta.label}
            </Button>
            {hero.menuCta?.href && (
              <Button href={hero.menuCta.href} variant="light" external={isExternal(hero.menuCta.href)}>
                {hero.menuCta.label}
              </Button>
            )}
          </div>
          {hero.reserveLink?.href && (
            <a href={hero.reserveLink.href} className={styles.phone}>
              <Icon name="arrow" size={18} />
              {hero.reserveLink.label}
            </a>
          )}
        </div>
      </div>

      {infoBar.length > 0 && (
        <div className={styles.bar}>
          <ul className={`container ${styles.barList}`}>
            {infoBar.map((item) => (
              <li key={item.label}>
                <span className={styles.barLabel}>{item.label}</span>
                <span className={styles.barValue}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
