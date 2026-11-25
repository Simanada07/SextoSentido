import business from '../config/business.js'
import { emailHref, locationPhoneHref, whatsappHref } from '../utils/links.js'
import Icon from './ui/Icon.jsx'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  const { name, logo, wordmark, contact, footer, nav, locations } = business
  const wa = whatsappHref()
  const mail = emailHref()
  const count = locations?.items?.length ?? 0
  const singleTel = count === 1 ? locationPhoneHref(locations.items[0]) : ''

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand} aria-label={`${name} — ${nav.homeLabel}`}>
            {logo?.src && <img src={logo.src} alt="" width="88" height="88" className={styles.logo} />}
            <span className={styles.brandText}>
              <span>{wordmark.secondary}</span>
              {wordmark.tagline && <small className={styles.tagline}>{wordmark.tagline}</small>}
            </span>
          </a>
          <p>{footer.note}</p>
        </div>

        <div>
          <h3 className={styles.label}>{footer.locationsTitle}</h3>
          {count === 1 ? (
            <>
              <p>{locations.items[0].address}</p>
              {locations.items[0].hours && <p>{locations.items[0].hours}</p>}
            </>
          ) : (
            <>
              <p className={styles.big}>{count}</p>
              <p>{footer.locationsSummary}</p>
            </>
          )}
          <a href={footer.locationsHref || '#restaurantes'} className={`${styles.link} ${styles.cta}`}>
            {footer.locationsLink}
            <Icon name="arrow" size={16} />
          </a>
        </div>

        <div>
          <h3 className={styles.label}>{footer.exploreTitle}</h3>
          <ul className={styles.contactList}>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={nav.cta.href} className={styles.link}>
                {nav.cta.label}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.label}>{footer.contactTitle}</h3>
          <ul className={styles.contactList}>
            {singleTel && (
              <li>
                <a href={singleTel} className={styles.link}>
                  {locations.items[0].phoneDisplay}
                </a>
              </li>
            )}
            {contact.instagram && (
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {footer.instagramLabel}
                  <Icon name="arrow" size={16} />
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {business.contactSection.labels.whatsapp}
                </a>
              </li>
            )}
            {mail && (
              <li>
                <a href={mail} className={styles.link}>
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span className={styles.bottomName}>
          <span aria-hidden="true">✦</span>
          {wordmark.secondary}
        </span>
        <p>
          © {year} {name}. {footer.rights}
        </p>
        <a href="#top" className={styles.backTop}>
          {footer.backToTop}
          <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  )
}
