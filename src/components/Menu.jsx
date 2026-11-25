import { useRef, useState } from 'react'
import business from '../config/business.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import styles from './Menu.module.css'

function PriceCells({ prices, count }) {
  return Array.from({ length: count }, (_, i) => (
    <span key={i} className={styles.price}>
      {prices[i] || ''}
    </span>
  ))
}

function MenuGroup({ group }) {
  const labels = group.priceLabels ?? []
  const cols = Math.max(labels.length, ...group.items.map((it) => it.prices.length))
  return (
    <div className={`${styles.group} ${group.title ? '' : styles.subgroup}`} style={{ '--cols': cols }}>
      {(group.title || labels.length > 0) && (
        <div className={`${styles.row} ${styles.groupHead}`}>
          <div>
            {group.title && <h3 className={styles.groupTitle}>{group.title}</h3>}
          </div>
          {labels.map((l, i) => (
            <span key={i} className={styles.priceLabel}>
              {l}
            </span>
          ))}
          {labels.length < cols &&
            Array.from({ length: cols - labels.length }, (_, i) => <span key={`e${i}`} />)}
        </div>
      )}
      {group.note && <p className={styles.groupNote}>{group.note}</p>}
      <ul className={styles.items}>
        {group.items.map((item) => (
          <li
            key={item.name + item.prices.join()}
            className={`${styles.row} ${styles.item} ${item.featured ? styles.featured : ''}`}
          >
            <div className={styles.itemText}>
              <span className={styles.itemName}>
                {item.name}
                {item.tag && <span className={styles.tag}>{item.tag}</span>}
              </span>
              {item.description && <span className={styles.itemDesc}>{item.description}</span>}
            </div>
            <PriceCells prices={item.prices} count={cols} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Menu() {
  const { menu } = business
  const categories = menu?.categories ?? []
  const [active, setActive] = useState(categories[0]?.id)
  const tabRefs = useRef([])
  if (categories.length === 0) return null

  const current = categories.find((c) => c.id === active) ?? categories[0]

  const select = (index) => {
    const next = (index + categories.length) % categories.length
    setActive(categories[next].id)
    const el = tabRefs.current[next]
    el?.focus()
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }

  const onKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') select(index + 1)
    else if (e.key === 'ArrowLeft') select(index - 1)
    else if (e.key === 'Home') select(0)
    else if (e.key === 'End') select(categories.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <section id="menu" className="section" aria-labelledby="menu-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="menu-title" eyebrow={menu.eyebrow} title={menu.title} intro={menu.intro} />
        </Reveal>

        <div className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist" aria-label={menu.tabsLabel}>
            {categories.map((cat, i) => {
              const selected = cat.id === current.id
              return (
                <button
                  key={cat.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
                  onClick={() => setActive(cat.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.layout}>
          <div
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className={styles.panel}
          >
            {current.groups.map((group, i) => (
              <MenuGroup key={i} group={group} />
            ))}
          </div>

          <aside className={styles.aside}>
            {menu.image?.src &&
              (() => {
                const img = (
                  <img
                    src={menu.image.src}
                    alt={menu.image.alt}
                    loading="lazy"
                    decoding="async"
                    style={menu.image.position ? { objectPosition: menu.image.position } : undefined}
                  />
                )
                return menu.fullMenu?.href ? (
                  <a
                    href={menu.fullMenu.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`media ${styles.asideMedia} ${styles.preview}`}
                  >
                    {img}
                    <span className={styles.previewLabel}>
                      {menu.fullMenu.label}
                      <Icon name="arrow" size={18} />
                    </span>
                  </a>
                ) : (
                  <div className={`media ${styles.asideMedia}`}>{img}</div>
                )
              })()}
            {menu.offer && (
              <div className={styles.offer}>
                <strong>{menu.offer.title}</strong>
                <p>{menu.offer.text}</p>
              </div>
            )}
            {menu.fullMenu?.href && !menu.image?.src && (
              <Button href={menu.fullMenu.href} variant="outline" external className={styles.fullMenu} icon={<Icon name="arrow" />}>
                {menu.fullMenu.label}
              </Button>
            )}
            {menu.notes?.length > 0 && (
              <ul className={styles.notes}>
                {menu.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
