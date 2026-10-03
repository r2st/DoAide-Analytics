import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#6d28d9']

export default function BarChart({ data, xKey, bars, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ borderRadius: 8 }} />
        <Legend />
        {bars.map((bar, i) => (
          <Bar key={bar} dataKey={bar} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  )
}
