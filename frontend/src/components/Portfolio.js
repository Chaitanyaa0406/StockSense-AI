import { useState } from "react";

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");

  const addStock = () => {
    if (!symbol || !price) return;

    setStocks([
      ...stocks,
      { symbol, buyPrice: parseFloat(price), current: parseFloat(price) }
    ]);

    setSymbol("");
    setPrice("");
  };

  const updatePrice = (index, newPrice) => {
    const updated = [...stocks];
    updated[index].current = parseFloat(newPrice);
    setStocks(updated);
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="mb-3">💼 Portfolio</h3>

      <div className="flex gap-2 mb-3">
        <input
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-gray-700 px-2 py-1 rounded"
        />
        <input
          placeholder="Buy Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-gray-700 px-2 py-1 rounded"
        />
        <button onClick={addStock} className="bg-green-600 px-2 rounded">
          Add
        </button>
      </div>

      {stocks.map((s, i) => {
        const profit = s.current - s.buyPrice;
        const color = profit >= 0 ? "text-green-400" : "text-red-400";

        return (
          <div key={i} className="flex justify-between mb-2">
            <span>{s.symbol}</span>

            <input
              className="w-20 bg-gray-700 px-1"
              value={s.current}
              onChange={(e) => updatePrice(i, e.target.value)}
            />

            <span className={color}>
              {profit.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Portfolio;