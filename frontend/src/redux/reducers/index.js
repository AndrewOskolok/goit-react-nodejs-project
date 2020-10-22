import { combineReducers } from "@reduxjs/toolkit";
import loader from "./loaderReducer";
import user from "./userReducer";

export const rootReducer = combineReducers({
  loader,
  user,
});
