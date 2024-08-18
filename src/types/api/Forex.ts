export type Ticker = {
  ticker: string; // Instrument symbol (ticker)
};

export type Pagination = {
  page: number;
  per_page: number;
};

export type Meta = {
  pagination: Pagination;
};

export type TickersResponse = {
  data: Ticker[];
  meta: Meta;
};

export type PriceResponse = {
  p: number; // Price at which the trade occurred
};

export type TimeSeries = {
  t: number; // Timestamp indicating when the trading interval opened
  o: number; // Price at the opening of the trading interval
  h: number; // Highest price reached during the trading interval
  l: number; // Lowest price reached during the trading interval
  c: number; // Closing price at the end of the trading interval
};

export type TimeSeriesReponse = { data: TimeSeries[] };

export const Intervals = ["1h", "1d", "1w", "1mo", "4mo"] as const;
export type Interval = (typeof Intervals)[number];
