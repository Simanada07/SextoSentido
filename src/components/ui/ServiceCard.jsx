import Icon from './Icon.jsx'
import styles from './ServiceCard.module.css'

export default function ServiceCard({ index, title, description, image, cta, cardCta, portrait = false }) {
  const number = String(index + 1).padStart(2, '0')
  const external = cta?.href?.startsWith('http')
  return (
    <article className={`${styles.card} ${portrait ? styles.portrait : ''}`}>
      <div className={`media ${styles.media}`}>
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
      </div>
      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{description}</p>
        {/* Round arrow button (shown by the nude style) */}
        {cardCta?.href && (
          <a href={cardCta.href} className={styles.arrow} aria-label={`${cardCta.label}: ${title}`}>
            <Icon name="arrow" size={20} />
          </a>
        )}
        {cta?.href && (
          <a
            href={cta.href}
            className={styles.cta}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {cta.label}
            <Icon name="arrow" size={18} />
          </a>
        )}
      </div>
    </article>
  )
}
