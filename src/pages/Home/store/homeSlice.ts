import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  name: string;
}

const initialState: HomeState = {
  name: ""
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export const { changeName } = homeSlice.actions;
