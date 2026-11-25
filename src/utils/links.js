import business from '../config/business.js'

const { contact, locations } = business

/** Builds the real tap-to-call / WhatsApp / email / maps links from the config. */
export const whatsappHref = (text = '') =>
  contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : ''

export const emailHref = (subject = '', body = '') => {
  if (!contact.email) return ''
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${contact.email}${query ? `?${query}` : ''}`
}

/** Phone link for one restaurant ('' when its phone isn't filled in). */
export const locationPhoneHref = (loc) => (loc?.phoneLink ? `tel:${loc.phoneLink}` : '')

/** Google Maps link for one restaurant: its own link, or a search by name. */
export const locationMapsHref = (loc) => {
  if (!loc) return ''
  if (loc.mapsUrl) return loc.mapsUrl
  const query = [locations?.mapsSearchPrefix, loc.name, loc.city].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
