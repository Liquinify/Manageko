import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/boardSlice";

export const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
