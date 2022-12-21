import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "./user";
export * from "./user";

export type RootState = {
  user: ReturnType<typeof userReducer>;
};

export default combineReducers({ user: userReducer });
