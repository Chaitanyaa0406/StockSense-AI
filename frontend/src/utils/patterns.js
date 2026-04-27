export const detectPatterns = (data) => {
  let signals = [];

  data.forEach((d) => {
    const body = Math.abs(d.Close - d.Open);
    const range = d.High - d.Low;

    // 🟡 Doji
    if (body < range * 0.1) {
      signals.push({
        x: new Date(d.Date),
        y: d.Close,
        type: "DOJI"
      });
    }

    // 🟢 Hammer (BUY)
    if ((d.Open - d.Low) > 2 * body && d.Close > d.Open) {
      signals.push({
        x: new Date(d.Date),
        y: d.Low,
        type: "BUY"
      });
    }

    // 🔴 SELL signal
    if (d.Close < d.Open && (d.High - d.Open) > 2 * body) {
      signals.push({
        x: new Date(d.Date),
        y: d.High,
        type: "SELL"
      });
    }
  });

  return signals;
};