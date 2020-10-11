import { createReducer } from "@reduxjs/toolkit";
import { loaderToggle } from "../actions/loaderAction";

const initialState = true;

export default createReducer(initialState, {
  [loaderToggle]: (state) => !state,
});
