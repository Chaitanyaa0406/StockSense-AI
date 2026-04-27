import yfinance as yf

def get_stock_data(symbol):
    df = yf.download(symbol, period="3mo", interval="1d")
    if df.empty:
        raise ValueError("Invalid stock symbol or no data")
    return df