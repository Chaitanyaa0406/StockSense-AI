import { useState } from "react";
import { useEffect } from "react";
import { getAnalysis } from "../api";
import ChartComponent from "./ChartComponent";
import RSIChart from "./RSIChart";
import AnalysisCard from "./AnalysisCard";
import CandleChart from "./CandleChart";
import AIInsights from "./AIInsights";
import { detectPatterns } from "../utils/patterns";
import Portfolio from "./Portfolio";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("RELIANCE.NS");
  const [data, setData] = useState(null);
  const signals = data ? detectPatterns(data.chart) : [];

  // ✅ ADD HERE
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalysis(symbol);
      setData(res);
    };

    fetchData(); // first load

    const interval = setInterval(fetchData, 5000); // auto refresh

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Trading Expert Dashboard</h1>
      </div>

      {/* INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          className="bg-gray-800 border border-gray-700 px-4 py-2 rounded w-64"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={() => setSymbol(symbol)}>
          Analyze
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT PANEL */}
          <div className="space-y-6">
            <AnalysisCard analysis={data.analysis} />
            <AIInsights analysis={data.analysis} />
            <Portfolio />
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-3 space-y-6">
            <CandleChart data={data.chart} signals={signals} />
            <ChartComponent data={data.chart} />
            <RSIChart data={data.chart} />
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;