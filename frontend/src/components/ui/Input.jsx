import clsx from 'clsx'

export default function Input({ label, error, helper, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <input
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
          'bg-white dark:bg-surface-dark border-border dark:border-gray-700',
          'text-gray-900 dark:text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
          error && 'border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {helper && !error && <p className="text-sm text-gray-500">{helper}</p>}
    </div>
  )
}
