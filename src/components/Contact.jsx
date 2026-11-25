import { useState } from 'react'
import business from '../config/business.js'
import { emailHref, locationMapsHref, locationPhoneHref, whatsappHref } from '../utils/links.js'
import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import styles from './Contact.module.css'

const FORM_ID = 'booking-form'
const emptyForm = { name: '', phone: '', service: '', date: '', time: '', guests: '2', message: '' }

// Day of the week (0 = Sunday) for a yyyy-mm-dd value, in local time.
function weekday(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function Contact() {
  const { contactSection: c, locations } = business
  const { form, labels } = c
  // Optional fields: a service picker (salons, clinics…) and a guest count (restaurants).
  const services = form.serviceOptions ?? []
  const askGuests = Boolean(form.maxGuests)
  const closedDays = form.closedWeekdays ?? []
  const allLocations = locations?.items ?? []
  // A single restaurant is chosen for the guest, so the picker is hidden.
  const single = allLocations.length === 1
  const [locationName, setLocationName] = useState(single ? allLocations[0].name : '')
  const [values, setValues] = useState(emptyForm)
  const [sent, setSent] = useState(null)
  const [today] = useState(() => new Date().getDay())

  const selected = allLocations.find((l) => l.name === locationName)
  const tel = locationPhoneHref(selected)
  const maps = locationMapsHref(selected)

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  // Refuse a date on a day the business is closed.
  const updateDate = (e) => {
    const { value } = e.target
    const closed = value && closedDays.includes(weekday(value))
    e.target.setCustomValidity(closed ? form.closedDayMessage || ' ' : '')
    update(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `${form.fields.location}: ${locationName}`,
      `${form.fields.name}: ${values.name}`,
      `${form.fields.phone}: ${values.phone}`,
      services.length > 0 && `${form.fields.service}: ${values.service}`,
      `${form.fields.date}: ${formatDate(values.date)}`,
      `${form.fields.time}: ${values.time}`,
      askGuests && `${form.fields.guests}: ${values.guests}`,
      values.message && `${form.fields.message} ${values.message}`,
    ].filter(Boolean)
    const text = [form.messageIntro, '', ...lines].join('\n')

    // Send through whichever channel the owner has set up in business.js.
    const wa = whatsappHref(text)
    const mail = emailHref(`${form.emailSubject} — ${locationName} — ${formatDate(values.date)}`, text)
    if (wa) window.open(wa, '_blank', 'noopener,noreferrer')
    else if (mail) window.location.assign(mail)

    setSent({ lines, location: selected, channel: wa || mail ? 'sent' : 'phone' })
    setValues(emptyForm)
  }

  const guestOptions = Array.from({ length: form.maxGuests || 0 }, (_, i) => String(i + 1))
  const wa = whatsappHref()
  const mail = emailHref()
  const sentTel = locationPhoneHref(sent?.location)

  return (
    <section id="contact" className="section section--dark" aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        {/* Left: choose a restaurant, see its details */}
        <Reveal className={styles.info}>
          <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

          {!single && (
            <label className={`${styles.field} ${styles.picker}`}>
              <span>{c.selectLabel}</span>
              <select
                name="location"
                form={FORM_ID}
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              >
                <option value="" disabled>
                  {c.selectPlaceholder}
                </option>
                {allLocations.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          {selected ? (
            <div className={styles.selected} aria-live="polite">
              {/* Call-first: the big action is phoning the chosen restaurant */}
              <a
                href={tel || maps}
                className={styles.callCard}
                {...(tel ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className={styles.callIcon}>
                  <Icon name="phone" size={26} />
                </span>
                <span className={styles.callText}>
                  <span className={styles.callLabel}>
                    {labels.callTo} {selected.name}
                  </span>
                  <span className={styles.callNumber}>{tel ? selected.phoneDisplay : labels.callViaMaps}</span>
                </span>
                <Icon name="arrow" size={22} />
              </a>
              {!tel && <p className={styles.callHint}>{c.noDetailsText}</p>}

              {(selected.address || selected.hours || selected.hoursTable) && (
                <dl className={styles.details}>
                  {selected.address && (
                    <div>
                      <dt>
                        <Icon name="pin" size={18} /> {labels.address}
                      </dt>
                      <dd>{selected.address}</dd>
                    </div>
                  )}
                  {selected.hoursTable ? (
                    <div>
                      <dt>
                        <Icon name="clock" size={18} /> {labels.hours}
                      </dt>
                      <dd className={styles.small}>
                        <ul className={styles.week}>
                          {selected.hoursTable.map((row) => {
                            const isToday = row.weekday === today
                            return (
                              <li
                                key={row.day}
                                className={[row.closed && styles.closed, isToday && styles.today].filter(Boolean).join(' ')}
                              >
                                <span>
                                  {row.day}
                                  {isToday && labels.today && <span className={styles.todayTag}>{labels.today}</span>}
                                </span>
                                <span>{row.time}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </dd>
                    </div>
                  ) : (
                    selected.hours && (
                      <div>
                        <dt>
                          <Icon name="clock" size={18} /> {labels.hours}
                        </dt>
                        <dd className={styles.small}>{selected.hours}</dd>
                      </div>
                    )
                  )}
                </dl>
              )}

              {tel && (
                <div className={styles.actions}>
                  <Button href={maps} variant="outline" external icon={<Icon name="pin" />}>
                    {labels.directions}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <Icon name="pin" size={22} />
              </span>
              <div>
                <p className="lead">{c.emptyText}</p>
                {c.emptyLink?.href && (
                  <a href={c.emptyLink.href} className={styles.emptyLink}>
                    {c.emptyLink.label}
                    <Icon name="arrow" size={18} />
                  </a>
                )}
              </div>
            </div>
          )}

          {(wa || mail) && (
            <div className={styles.actions}>
              {wa && (
                <Button href={wa} variant="outline" external icon={<Icon name="whatsapp" />}>
                  {labels.whatsapp}
                </Button>
              )}
              {mail && (
                <Button href={mail} variant="outline" icon={<Icon name="mail" />}>
                  {labels.email}
                </Button>
              )}
            </div>
          )}
        </Reveal>

        {/* Right: booking request */}
        <Reveal className={styles.card} delay={120}>
          <div className={`media ${styles.cardMedia}`}>
            <img src={c.image.src} alt={c.image.alt} loading="lazy" decoding="async" />
          </div>

          <div className={styles.cardBody}>
            {sent ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon}>
                  <Icon name="check" size={24} />
                </span>
                <h3>{form.successTitle}</h3>
                <p className="lead">{sent.channel === 'phone' ? form.successText : form.successTextSent}</p>
                <ul className={styles.summary}>
                  {sent.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className={styles.successActions}>
                  {sentTel ? (
                    <Button href={sentTel} icon={<Icon name="phone" />}>
                      {labels.call ? `${labels.call} · ${sent.location.phoneDisplay}` : sent.location.phoneDisplay}
                    </Button>
                  ) : (
                    <Button href={locationMapsHref(sent.location)} external icon={<Icon name="pin" />}>
                      {labels.maps}
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSent(null)}>
                    {form.sendAnother}
                  </Button>
                </div>
              </div>
            ) : (
              <form id={FORM_ID} className={styles.form} onSubmit={handleSubmit}>
                <h3>{form.title}</h3>
                {selected && !single && <p className={styles.forLocation}>{selected.name}</p>}

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>{form.fields.name}</span>
                    <input name="name" value={values.name} onChange={update} required autoComplete="name" />
                  </label>
                  <label className={styles.field}>
                    <span>{form.fields.phone}</span>
                    <input
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={update}
                      required
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                </div>

                {services.length > 0 && (
                  <label className={styles.field}>
                    <span>{form.fields.service}</span>
                    <select name="service" value={values.service} onChange={update} required>
                      <option value="" disabled>
                        {form.servicePlaceholder || '—'}
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <div className={`${styles.row} ${askGuests ? styles.row3 : ''}`}>
                  <label className={styles.field}>
                    <span>{form.fields.date}</span>
                    <input name="date" type="date" min={todayISO()} value={values.date} onChange={updateDate} required />
                  </label>
                  <label className={styles.field}>
                    <span>{form.fields.time}</span>
                    <select name="time" value={values.time} onChange={update} required>
                      <option value="" disabled>
                        —
                      </option>
                      {form.timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  {askGuests && (
                    <label className={styles.field}>
                      <span>{form.fields.guests}</span>
                      <select name="guests" value={values.guests} onChange={update} required>
                        {guestOptions.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
                {form.dateHint && <p className={styles.hint}>{form.dateHint}</p>}

                <label className={styles.field}>
                  <span>{form.fields.message}</span>
                  <textarea
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={update}
                    placeholder={form.fields.messagePlaceholder}
                  />
                </label>

                <Button type="submit" className={styles.submit} icon={<Icon name="arrow" />}>
                  {form.submit}
                </Button>
                <p className={styles.note}>{form.note}</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
