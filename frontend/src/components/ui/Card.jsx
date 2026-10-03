import clsx from 'clsx'

export default function Card({ children, header, footer, className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-border bg-white dark:bg-surface-dark-secondary dark:border-gray-800 shadow-sm',
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-border dark:border-gray-800">{header}</div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-border dark:border-gray-800">{footer}</div>
      )}
    </div>
  )
}
