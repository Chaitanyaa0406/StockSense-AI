import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.Date).toLocaleDateString()),
    datasets: [
      {
        label: "Price",
        data: data.map(d => d.Close),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
      },
      {
        label: "Moving Avg",
        data: data.map(d => d.MA),
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.2)",
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h3 className="text-lg mb-4">📊 Price Trend</h3>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;