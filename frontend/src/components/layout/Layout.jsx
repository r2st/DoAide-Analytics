import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-surface-dark">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
