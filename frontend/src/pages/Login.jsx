import { BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoggingIn, loginError } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <BarChart3 className="text-primary" size={32} />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">DoAide</span>
        </div>

        <div className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Sign in to your account</h2>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400">
              Invalid email or password
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
