import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import useAuthStore from '../store/authStore'

export function useAuth() {
  const { login, logout, setUser, isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (res) => {
      login(res.data.access_token, null)
      navigate('/app/dashboards')
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: () => navigate('/login'),
  })

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me').then((r) => r.data),
    enabled: isAuthenticated,
    onSuccess: (data) => setUser(data),
  })

  return {
    user: meQuery.data || user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: () => {
      logout()
      navigate('/login')
    },
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}
