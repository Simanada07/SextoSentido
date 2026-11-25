import business from '../config/business.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import ServiceCard from './ui/ServiceCard.jsx'
import Tilt from './ui/Tilt.jsx'
import styles from './Services.module.css'

export default function Services() {
  const { services } = business
  const items = services.items ?? []
  if (items.length === 0) return null

  // One or two services: a larger feature layout. Exactly four: a row of
  // tall portrait cards (2 × 2 on tablets) instead of a 3-column grid with one left over.
  const four = items.length === 4
  const layout = items.length < 3 ? styles.feature : four ? styles.grid4 : styles.grid

  return (
    <section id="services" className="section section--alt" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow={services.eyebrow}
            title={services.title}
            intro={services.intro}
          />
        </Reveal>

        <div className={layout}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <Tilt className={styles.tilt}>
                <ServiceCard index={i} portrait={four} cardCta={services.cardCta} {...item} />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
