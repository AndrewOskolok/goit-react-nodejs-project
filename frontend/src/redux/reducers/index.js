import { combineReducers } from "@reduxjs/toolkit";
import loader from "./loaderReducer";

export const rootReducer = combineReducers({
  loader,
});
