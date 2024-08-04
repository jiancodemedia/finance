import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./components/App/store/slice";
import { homeSlice } from "./pages/Home/store/homeSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    home: homeSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
