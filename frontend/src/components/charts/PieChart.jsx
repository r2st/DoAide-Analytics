import {
  Cell,
  Legend,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#6d28d9', '#4c1d95']

export default function PieChart({ data, nameKey, valueKey, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={100} label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  )
}
