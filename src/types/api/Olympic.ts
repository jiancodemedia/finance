export type OlympicData = {
  data: Countries[];
  links: Links;
  meta: Meta;
};

export type Links = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Countries = {
  id: string;
  name: string;
  continent: string;
  flag_url: string;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  total_medals: number;
  rank: number;
  rank_total_medals: number;
};

export type OlympicSports = {
  data: Sport[];
};

export type Sport = {
  id: string;
  name: string;
  pictogram_url: string;
};
