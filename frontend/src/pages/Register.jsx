import { BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const { register, isRegistering } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setError('')
    register({ full_name: form.full_name, email: form.email, password: form.password })
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <BarChart3 className="text-primary" size={32} />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">DoAide</span>
        </div>

        <div className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create your account</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.full_name} onChange={update('full_name')} placeholder="John Doe" required />
            <Input label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" required />
            <Input label="Password" type="password" value={form.password} onChange={update('password')} placeholder="Create a password" required />
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={update('confirm')} placeholder="Confirm your password" required />
            <Button type="submit" className="w-full" disabled={isRegistering}>
              {isRegistering ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
