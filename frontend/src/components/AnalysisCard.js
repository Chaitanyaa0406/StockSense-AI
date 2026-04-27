const AnalysisCard = ({ analysis }) => {

  const getStyle = () => {
    if (analysis.decision.includes("BUY"))
      return "border-green-500 text-green-400";
    if (analysis.decision.includes("SELL"))
      return "border-red-500 text-red-400";
    return "border-yellow-500 text-yellow-400";
  };

  return (
    <div className={`bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 ${getStyle()}`}>

      <h2 className="text-2xl font-bold mb-2">
        {analysis.decision}
      </h2>

      <p className="mb-4">
        🎯 Confidence: <span className="font-bold">{analysis.confidence}%</span>
      </p>

      <div className="mb-4">
        <p className="font-semibold">🧠 Analysis</p>
        <p className="text-gray-300">{analysis.explanation}</p>
      </div>

      <div>
        <p className="font-semibold">💡 Key Factors</p>
        <ul className="list-disc ml-5 text-gray-300">
          {analysis.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default AnalysisCard;