import BarChart from '../charts/BarChart'
import DataTable from '../charts/DataTable'
import FunnelChart from '../charts/FunnelChart'
import KPICard from '../charts/KPICard'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'

export default function WidgetRenderer({ widget }) {
  const { widget_type, config = {}, title } = widget
  const data = config.data || []

  switch (widget_type) {
    case 'line_chart':
      return <LineChart data={data} xKey={config.xKey || 'x'} lines={config.lines || ['y']} />
    case 'bar_chart':
      return <BarChart data={data} xKey={config.xKey || 'x'} bars={config.bars || ['y']} />
    case 'pie_chart':
      return <PieChart data={data} nameKey={config.nameKey || 'name'} valueKey={config.valueKey || 'value'} />
    case 'funnel_chart':
      return <FunnelChart data={data} nameKey={config.nameKey || 'name'} valueKey={config.valueKey || 'value'} />
    case 'kpi':
      return <KPICard label={title} value={config.value || 0} trend={config.trend} trendValue={config.trendValue} prefix={config.prefix} suffix={config.suffix} />
    case 'table':
      return <DataTable columns={config.columns || []} data={data} />
    default:
      return <div className="text-sm text-gray-500 p-4">Unknown widget type: {widget_type}</div>
  }
}
