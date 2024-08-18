import axios from "axios";
import {
  Interval,
  PriceResponse,
  TickersResponse,
  TimeSeriesReponse
} from "../types/api/Forex";

const api_key = process.env.REACT_APP_FINAZON_API_KEY;
const baseURL = `${process.env.REACT_APP_FINAZON_URL}/latest/finazon/forex`;
const api = axios.create({
  baseURL,
  headers: {
    Authorization: `apikey ${api_key}`
  }
});

export const getTickers = (page_size: number) => {
  return api.get<TickersResponse>(`/tickers?page_size=${page_size}`);
};

export const getPrice = (ticker: string) => {
  return api.get<PriceResponse>(`/price?ticker=${ticker}`);
};

export const getTimeSeries = (ticker: string, interval: Interval) => {
  return api.get<TimeSeriesReponse>(
    `/time_series?order=asc&ticker=${ticker}&interval=${interval}`
  );
};
