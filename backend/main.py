from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from data_fetcher import get_stock_data
from indicators import add_indicators
from expert_engine import analyze_stock

# ✅ DEFINE APP FIRST
app = FastAPI()

# ✅ CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ HOME ROUTE
@app.get("/")
def home():
    return {"message": "Stock Expert System Running 🚀"}


# ✅ MAIN ANALYSIS ROUTE
@app.get("/analyze/{symbol}")
def analyze(symbol: str):
    try:
        df = get_stock_data(symbol)

        # ✅ Fix multi-index columns (yfinance issue)
        if hasattr(df.columns, "levels"):
            df.columns = df.columns.get_level_values(0)

        df = add_indicators(df)

        result = analyze_stock(df)

        # ✅ Safe chart data creation
        df_reset = df.reset_index()

        chart_data = []
        for _, row in df_reset.tail(30).iterrows():
            chart_data.append({
                "Date": str(row["Date"]),
                "Close": float(row["Close"]) if not pd.isna(row["Close"]) else 0,
                "MA": float(row["MA"]) if not pd.isna(row["MA"]) else 0,
                "Open": float(row["Open"]),
                "High": float(row["High"]),
                "Low": float(row["Low"]),
                "Volume": float(row["Volume"]),
                "RSI": float(row["RSI"])
            })

        return {
            "stock": symbol,
            "analysis": result,
            "chart": chart_data
        }

    except Exception as e:
        return {"error": str(e)}