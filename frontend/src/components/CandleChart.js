import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Tooltip
} from "chart.js";

import {
  CandlestickController,
  CandlestickElement
} from "chartjs-chart-financial";

import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, Tooltip, CandlestickController, CandlestickElement);

const CandleChart = ({ data, signals }) => {

  const chartData = {
    datasets: [
      {
        label: "Candlestick",
        data: data.map(d => ({
          x: new Date(d.Date),
          o: d.Open,
          h: d.High,
          l: d.Low,
          c: d.Close
        })),
        color: {
          up: "#22c55e",
          down: "#ef4444",
          unchanged: "#999"
        }
      },

      {
        type: "scatter",
        label: "Signals",
        data: signals,
        pointRadius: 5,
        backgroundColor: (ctx) =>
          ctx.raw.type === "BUY" ? "#22c55e" : "#ef4444",
      }
    ]
  };

  const options = {
    scales: {
      x: { type: "time", ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="mb-3">🕯️ Candlestick Chart</h3>
      <div className="h-[400px]">
        <Chart key={JSON.stringify(data)} type="candlestick" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CandleChart;