import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  tickers: string[];
  selectedTicker: string;
}

const initialState: HomeState = {
  tickers: ["AUD/USD", "EUR/USD", "GBP/USD"],
  selectedTicker: "AUD/USD"
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedTicker: (state, action: PayloadAction<string>) => {
      state.selectedTicker = action.payload;
    }
  }
});

export const { setSelectedTicker } = homeSlice.actions;
