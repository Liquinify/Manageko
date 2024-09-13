import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/boardSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import controlsSlice from "./features/controlsSlice";

const rootReducers = combineReducers({
  boards: boardSlice.reducer,
  controls: controlsSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
