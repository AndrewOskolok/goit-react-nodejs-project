import { createReducer } from "@reduxjs/toolkit";
import { currentMonth } from "../actions/transactionAction";

export default createReducer([], {
  [currentMonth]: (_, { payload }) => payload,
});
