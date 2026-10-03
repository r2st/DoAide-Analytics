import { useRef } from 'react'
import { Responsive, useContainerWidth } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import WidgetRenderer from './WidgetRenderer'

export default function DashboardGrid({ widgets, onLayoutChange, editable }) {
  const containerRef = useRef(null)
  const width = useContainerWidth(containerRef)

  const layout = widgets.map((w) => ({
    i: w.id,
    x: w.position?.x || 0,
    y: w.position?.y || 0,
    w: w.position?.w || 6,
    h: w.position?.h || 4,
  }))

  return (
    <div ref={containerRef}>
      {width > 0 && (
        <Responsive
          width={width}
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 8, sm: 4 }}
          rowHeight={60}
          isDraggable={editable}
          isResizable={editable}
          onLayoutChange={(layout) => onLayoutChange?.(layout)}
        >
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="rounded-xl border border-border dark:border-gray-800 bg-white dark:bg-surface-dark-secondary overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-border/50 dark:border-gray-800/50">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{widget.title}</h4>
              </div>
              <div className="p-3">
                <WidgetRenderer widget={widget} />
              </div>
            </div>
          ))}
        </Responsive>
      )}
    </div>
  )
}
