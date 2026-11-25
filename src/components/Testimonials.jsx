import business from '../config/business.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import styles from './Testimonials.module.css'

/* Hidden automatically until real reviews are added in business.js */
export default function Testimonials() {
  const { testimonials } = business
  const items = testimonials.items ?? []
  if (items.length === 0) return null

  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            align="center"
          />
        </Reveal>
        <div className={styles.grid}>
          {items.map((t, i) => (
            <Reveal as="figure" key={t.name + i} className={styles.card} delay={i * 80}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.detail && <span>{t.detail}</span>}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
