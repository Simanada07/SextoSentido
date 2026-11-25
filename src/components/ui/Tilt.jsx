import { useEffect, useRef } from 'react'

/**
 * Gentle 3D tilt that follows the mouse. It only sets two CSS variables
 * (--tilt-x, --tilt-y); whether they are used is up to the active style in
 * global.css (the nude style uses them). Does nothing on touch screens or
 * when the visitor prefers reduced motion.
 */
export default function Tilt({ as: Tag = 'div', max = 6, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return undefined

    let frame = 0
    const set = (x, y) => {
      el.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.classList.add('is-tilting')
        set(-py * max, px * max)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-tilting')
      set(0, 0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])

  return (
    <Tag ref={ref} className={`tilt${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  )
}
