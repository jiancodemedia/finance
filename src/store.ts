import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./components/App/store/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
