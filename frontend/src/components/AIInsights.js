const AIInsights = ({ analysis }) => {

  const getColor = () => {
    if (analysis.decision.includes("BUY")) return "text-green-400";
    if (analysis.decision.includes("SELL")) return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="mb-3">🤖 AI Insights</h3>

      <p className={`text-xl font-bold ${getColor()}`}>
        {analysis.decision}
      </p>

      <p className="text-gray-300 mt-2">
        Confidence: {analysis.confidence}%
      </p>

      <p className="text-gray-400 mt-3">
        {analysis.explanation}
      </p>
    </div>
  );
};

export default AIInsights;