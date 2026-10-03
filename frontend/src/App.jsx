import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AIInsights from './pages/AIInsights'
import DashboardBuilder from './pages/DashboardBuilder'
import DashboardList from './pages/DashboardList'
import DataSources from './pages/DataSources'
import DatasetViewer from './pages/DatasetViewer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Pricing from './pages/Pricing'
import Register from './pages/Register'
import Reports from './pages/Reports'
import ScheduledReports from './pages/ScheduledReports'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/app" element={<Layout />}>
        <Route path="dashboards" element={<DashboardList />} />
        <Route path="dashboards/:id" element={<DashboardBuilder />} />
        <Route path="data-sources" element={<DataSources />} />
        <Route path="datasets/:id" element={<DatasetViewer />} />
        <Route path="insights" element={<AIInsights />} />
        <Route path="reports" element={<Reports />} />
        <Route path="scheduled-reports" element={<ScheduledReports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
