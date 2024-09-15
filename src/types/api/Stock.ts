export type StockData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  country: string;
  type: string;
  figi_code: string;
};

export type TickerResponse = {
  data: {
    data: StockData[];
    count: number;
    status: string;
  };
};

export type PriceResponse = {
  p: number;
};
