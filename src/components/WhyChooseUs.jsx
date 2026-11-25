import business from '../config/business.js'
import Highlight from './ui/Highlight.jsx'
import Reveal from './ui/Reveal.jsx'
import styles from './WhyChooseUs.module.css'

export default function WhyChooseUs() {
  const { why } = business
  if (!why.items?.length) return null

  return (
    <section className="section section--red" aria-labelledby="why-title">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">{why.eyebrow}</span>
          <h2 id="why-title">
            <Highlight text={why.title} />
          </h2>
        </Reveal>

        <ol className={styles.list}>
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} className={styles.item} delay={i * 80}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
