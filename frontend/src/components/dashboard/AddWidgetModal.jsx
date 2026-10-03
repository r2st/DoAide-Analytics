import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Modal from '../ui/Modal'
import Select from '../ui/Select'

const widgetTypes = [
  { value: 'line_chart', label: 'Line Chart' },
  { value: 'bar_chart', label: 'Bar Chart' },
  { value: 'pie_chart', label: 'Pie Chart' },
  { value: 'funnel_chart', label: 'Funnel Chart' },
  { value: 'kpi', label: 'KPI Card' },
  { value: 'table', label: 'Data Table' },
  { value: 'text', label: 'Text Block' },
]

export default function AddWidgetModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('line_chart')

  const handleAdd = () => {
    onAdd({ widget_type: type, title: title || 'New Widget', config: {}, position: { x: 0, y: 0, w: 6, h: 4 } })
    setTitle('')
    setType('line_chart')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Widget">
      <div className="space-y-4">
        <Input label="Widget Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter widget title" />
        <Select label="Widget Type" options={widgetTypes} value={type} onChange={(e) => setType(e.target.value)} />
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add Widget</Button>
        </div>
      </div>
    </Modal>
  )
}
