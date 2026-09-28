export default function ShinyButton({
  children,
  label,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={`contact-shiny-button ${className}`.trim()}
      {...props}
    >
      <span className="contact-shiny-button__label">{children ?? label}</span>
    </button>
  );
}
