export type Data = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  country: string;
  type: string;
  figi_code: string;
};

export type TickerResponse = {
  data: Data[];
  count: number;
  status: string;
};

export type PriceResponse = {
  p: number;
};
