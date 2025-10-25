import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ZoneChartProps {
  data: { [key: string]: number };
}

export default function ZoneChart({ data }: ZoneChartProps) {
  const chartData = Object.entries(data).map(([zone, accidents]) => ({
    zone,
    accidents,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Zone-wise Accidents (2025)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zone" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accidents" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
