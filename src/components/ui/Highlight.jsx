/**
 * Renders text where words wrapped in *asterisks* get the brand highlight
 * colour — e.g. 'Almoço e jantar *todos os dias*'.
 */
export default function Highlight({ text = '' }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <span key={i} className="hl">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  )
}
