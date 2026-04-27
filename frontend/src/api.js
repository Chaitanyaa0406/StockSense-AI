import axios from "axios";

export const getAnalysis = async (symbol) => {
  const res = await axios.get(`http://127.0.0.1:8000/analyze/${symbol}`);
  const API_URL = "https://your-backend.onrender.com";
  return res.data;
};