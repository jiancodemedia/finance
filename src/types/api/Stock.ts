import axios from "axios";
import { PriceResponse, TickerResponse } from "../../apis/stock";

const api_key = process.env.REACT_APP_FINAZON_API_KEY;
const baseURL = `${process.env.REACT_APP_FINAZON_URL}/latest/rivium/rivium_de`;
const api = axios.create({
  baseURL,
  headers: {
    Authorization: `apikey ${api_key}`
  }
});

export const getTickers = (ticker: number) => {
  return api.get<TickerResponse>(`/tickers?=${ticker}`);
};

export const getPrice = (ticker: string) => {
  return api.get<PriceResponse>(`/price?ticker=${ticker}`);
};
