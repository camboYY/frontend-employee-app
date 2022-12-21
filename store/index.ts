import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";
export * from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type { RootState } from "./reducers";
export type AppDispatch = typeof store.dispatch;
