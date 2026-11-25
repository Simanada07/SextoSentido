import business from '../config/business.js'
import Highlight from './ui/Highlight.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import styles from './Faq.module.css'

export default function Faq() {
  const { faq } = business
  if (!faq.items?.length) return null

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.head}>
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 id="faq-title">
            <Highlight text={faq.title} />
          </h2>
        </Reveal>

        <Reveal className={styles.list} delay={100}>
          {faq.items.map((item, i) => (
            <details key={item.question} className={styles.item} open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className={styles.icon}>
                  <Icon name="plus" size={20} />
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
