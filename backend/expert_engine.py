import math

def analyze_stock(df):
    try:
        # ✅ Ensure latest row is a proper Series
        latest = df.iloc[-1]

        # ✅ Safe conversion function (handles Series, ndarray, NaN)
        def safe_float(x):
            try:
                if hasattr(x, "values"):  # pandas Series
                    x = x.values[0]
                if hasattr(x, "__len__") and not isinstance(x, (str, bytes)):
                    x = x[0]  # numpy array
                x = float(x)
                if math.isnan(x):
                    return 0.0
                return x
            except:
                return 0.0

        # ✅ Extract values safely
        price = safe_float(latest['Close'])
        ma = safe_float(latest['MA'])
        rsi = safe_float(latest['RSI'])
        macd = safe_float(latest['MACD'])
        signal = safe_float(latest['Signal'])
        upper = safe_float(latest['Upper'])
        lower = safe_float(latest['Lower'])

        score = 0
        reasons = []

        # 📉 RSI Analysis
        if rsi < 30:
            score += 25
            reasons.append("RSI indicates oversold (BUY signal)")
        elif rsi > 70:
            score -= 25
            reasons.append("RSI indicates overbought (SELL signal)")

        # 📈 Trend Analysis
        if price > ma:
            score += 20
            reasons.append("Price above moving average (Uptrend)")
        else:
            score -= 20
            reasons.append("Price below moving average (Downtrend)")

        # 📊 MACD Analysis
        if macd > signal:
            score += 25
            reasons.append("MACD bullish crossover")
        else:
            score -= 25
            reasons.append("MACD bearish crossover")

        # 📉 Bollinger Bands Analysis
        if price < lower:
            score += 20
            reasons.append("Price near lower band → possible upward reversal")
        elif price > upper:
            score -= 20
            reasons.append("Price near upper band → possible downward reversal")

        # 🎯 Final Decision
        if score >= 50:
            decision = "STRONG BUY"
        elif score >= 20:
            decision = "BUY"
        elif score <= -50:
            decision = "STRONG SELL"
        elif score <= -20:
            decision = "SELL"
        else:
            decision = "HOLD"

        confidence = min(abs(score), 100)

        # 🧠 Expert Explanation
        explanation = (
            f"RSI is {rsi:.2f}, price is {'above' if price > ma else 'below'} moving average. "
            f"MACD indicates {'bullish' if macd > signal else 'bearish'} momentum. "
            f"Final recommendation: {decision} with {confidence}% confidence."
        )

        return {
            "decision": decision,
            "confidence": int(confidence),
            "price": round(price, 2),
            "rsi": round(rsi, 2),
            "explanation": explanation,
            "reasons": reasons
        }

    except Exception as e:
        return {
            "decision": "ERROR",
            "confidence": 0,
            "price": 0,
            "rsi": 0,
            "explanation": f"System error: {str(e)}",
            "reasons": []
        }