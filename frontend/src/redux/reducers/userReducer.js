import { createReducer } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (state) => !state,
});
