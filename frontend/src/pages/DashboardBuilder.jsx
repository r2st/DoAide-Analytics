import { Edit3, Plus, Save, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddWidgetModal from '../components/dashboard/AddWidgetModal'
import DashboardGrid from '../components/dashboard/DashboardGrid'
import Button from '../components/ui/Button'
import useDashboardStore from '../store/dashboardStore'

export default function DashboardBuilder() {
  const { id } = useParams()
  const { widgets, addWidget, updateLayout } = useDashboardStore()
  const [editable, setEditable] = useState(false)
  const [showAddWidget, setShowAddWidget] = useState(false)

  const handleAddWidget = (widget) => {
    addWidget({ ...widget, id: crypto.randomUUID() })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Build your analytics view</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEditable(!editable)}>
            <Edit3 size={16} className="mr-1" /> {editable ? 'Lock' : 'Edit'}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 size={16} className="mr-1" /> Share
          </Button>
          <Button variant="ghost" size="sm">
            <Save size={16} className="mr-1" /> Save
          </Button>
          <Button size="sm" onClick={() => setShowAddWidget(true)}>
            <Plus size={16} className="mr-1" /> Add Widget
          </Button>
        </div>
      </div>

      <DashboardGrid widgets={widgets} onLayoutChange={updateLayout} editable={editable} />

      <AddWidgetModal isOpen={showAddWidget} onClose={() => setShowAddWidget(false)} onAdd={handleAddWidget} />
    </div>
  )
}
