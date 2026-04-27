import pandas as pd

def add_indicators(df):
    df['MA'] = df['Close'].rolling(20).mean()

    delta = df['Close'].diff()
    gain = delta.clip(lower=0).rolling(14).mean()
    loss = (-delta.clip(upper=0)).rolling(14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))

    exp1 = df['Close'].ewm(span=12).mean()
    exp2 = df['Close'].ewm(span=26).mean()
    df['MACD'] = exp1 - exp2
    df['Signal'] = df['MACD'].ewm(span=9).mean()

    df['Upper'] = df['Close'].rolling(20).mean() + 2 * df['Close'].rolling(20).std()
    df['Lower'] = df['Close'].rolling(20).mean() - 2 * df['Close'].rolling(20).std()

    return df