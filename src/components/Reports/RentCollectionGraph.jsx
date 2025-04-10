import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", rentCollected: 5000 },
  { month: "Feb", rentCollected: 7000 },
  { month: "Mar", rentCollected: 8000 },
  { month: "Apr", rentCollected: 6000 },
  { month: "May", rentCollected: 9000 }
];

function RentCollectionGraph() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Rent Collection Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="rentCollected"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RentCollectionGraph;
