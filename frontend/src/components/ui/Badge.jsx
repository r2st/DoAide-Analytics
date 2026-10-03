import clsx from 'clsx'

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export default function Badge({ children, color = 'primary', className }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', colorMap[color], className)}>
      {children}
    </span>
  )
}
