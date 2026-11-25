import business from '../config/business.js'
import Highlight from './ui/Highlight.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import Tilt from './ui/Tilt.jsx'
import styles from './About.module.css'

export default function About() {
  const { about } = business
  const badge = about.badge
  // `tone: 'light'` puts the story on the page background instead of the dark band.
  const tone = about.tone === 'light' ? '' : 'section--dark'

  return (
    <section id="about" className={`section ${tone}`} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.visual}>
          <Tilt max={4} className={`media ${styles.media}`}>
            <img src={about.image.src} alt={about.image.alt} loading="lazy" decoding="async" />
          </Tilt>
          {badge && (
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>{badge.label}</span>
              <div className={styles.badgeRow}>
                <strong>{badge.value}</strong>
                {badge.detail && <span>{badge.detail}</span>}
              </div>
            </div>
          )}
        </Reveal>

        <Reveal className={styles.text} delay={120}>
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 id="about-title">
            <Highlight text={about.title} />
          </h2>
          <div className={styles.copy}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {about.signature && <p className={styles.signature}>{about.signature}</p>}
          {about.link?.href && (
            <a href={about.link.href} className={styles.link}>
              {about.link.label}
              <Icon name="arrow" size={18} />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  )
}
