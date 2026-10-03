import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#6d28d9']

export default function LineChart({ data, xKey, lines, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <Legend />
        {lines.map((line, i) => (
          <Line
            key={line}
            type="monotone"
            dataKey={line}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}
