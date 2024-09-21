import axios from "axios";
import { OlympicData, OlympicSports } from "../types/api/Olympic";

const baseApi = axios.create({
  baseURL: "https://apis.codante.io/olympic-games"
});

export const getCountries = (name: string) => {
  return baseApi.get<OlympicData>(`/countries?name=${name}`);
};

export const getSports = (name: string) => {
  return baseApi.get<OlympicSports>(`/disciplines?name=${name}`);
};
