import Highlight from './Highlight.jsx'
import styles from './SectionHeading.module.css'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', id }) {
  return (
    <header className={`${styles.heading} ${styles[align]}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>
        <Highlight text={title} />
      </h2>
      {intro && <p className={`lead ${styles.intro}`}>{intro}</p>}
    </header>
  )
}
