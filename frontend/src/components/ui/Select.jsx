import clsx from 'clsx'

export default function Select({ label, options, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <select
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm',
          'bg-white dark:bg-surface-dark border-border dark:border-gray-700',
          'text-gray-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
