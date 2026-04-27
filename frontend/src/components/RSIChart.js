import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RSIChart = ({ data }) => {

  const chartData = {
    labels: data.map(d => new Date(d.Date).toLocaleDateString()),
    datasets: [
      {
        label: "RSI",
        data: data.map(d => d.RSI || 50),
        borderColor: "#38bdf8",
        tension: 0.4,
      },

      // 🔴 Overbought (70)
      {
        label: "Overbought",
        data: data.map(() => 70),
        borderColor: "#ef4444",
        borderDash: [5, 5],
      },

      // 🟢 Oversold (30)
      {
        label: "Oversold",
        data: data.map(() => 30),
        borderColor: "#22c55e",
        borderDash: [5, 5],
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { color: "white" }
      },
      x: {
        ticks: { color: "white" }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h3 className="text-lg mb-3">📉 RSI Indicator</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RSIChart;