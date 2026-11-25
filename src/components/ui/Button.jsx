import styles from './Button.module.css'

/**
 * One button for the whole site.
 * variant: "primary" (red) | "outline" (dark border) | "light" (for dark backgrounds)
 * Renders a link when `href` is given, otherwise a <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
