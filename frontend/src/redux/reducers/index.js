import { combineReducers } from "@reduxjs/toolkit";
import loader from "./loaderReducer";
import { error } from "./errorReducer";

export const rootReducer = combineReducers({
  loader,
  error
});
