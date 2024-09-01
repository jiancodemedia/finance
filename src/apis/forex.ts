import axios from "axios";
import {
  CandlesRange,
  LineRange,
  PriceResponse,
  TickersResponse,
  TimeSeriesReponse
} from "../types/api/Forex";
import {
  differenceInCalendarWeeks,
  differenceInDays,
  subMonths,
  subYears
} from "date-fns";

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

export const getCandlesChartTimeSeries = (
  ticker: string,
  range: CandlesRange
) => {
  let interval = "1d";
  let pageSize = 7;

  if (range == "14d") {
    pageSize = 14;
  } else if (range == "1mo") {
    const currentDate = new Date();
    const lastMonthSameDay = subMonths(currentDate, 1);
    const diffInDays = differenceInDays(currentDate, lastMonthSameDay);
    pageSize = diffInDays;
  } else if (range == "6mo") {
    const currentDate = new Date();
    const sixMonthsAgo = subMonths(currentDate, 6);
    const weeksInLastSixMonths = differenceInCalendarWeeks(
      currentDate,
      sixMonthsAgo
    );
    interval = "1w";
    pageSize = weeksInLastSixMonths;
  }

  return api.get<TimeSeriesReponse>(
    `/time_series?ticker=${ticker}&interval=${interval}&page_size=${pageSize}`
  );
};

export const getLineChartTimeSeries = (ticker: string, range: LineRange) => {
  let interval = "1h";
  let pageSize = 24;

  if (range == "5d") {
    pageSize = 24 * 5;
  } else if (range == "1mo") {
    const currentDate = new Date();
    const lastMonthSameDay = subMonths(currentDate, 1);
    const diffInDays = differenceInDays(currentDate, lastMonthSameDay);
    interval = "1d";
    pageSize = diffInDays;
  } else if (range == "1y") {
    const currentDate = new Date();
    const oneYearAgo = subYears(currentDate, 1);
    const weeksInLastYear = differenceInCalendarWeeks(currentDate, oneYearAgo);
    interval = "1d";
    pageSize = weeksInLastYear;
  }

  return api.get<TimeSeriesReponse>(
    `/time_series?ticker=${ticker}&interval=${interval}&page_size=${pageSize}`
  );
};
