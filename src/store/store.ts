import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/boardSlice";
import themeSlice from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
