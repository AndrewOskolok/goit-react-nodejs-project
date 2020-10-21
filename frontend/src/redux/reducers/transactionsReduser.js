import { createReducer } from "@reduxjs/toolkit";
import {
  currentMonth,
  filteredTransaction,
} from "../actions/transactionActions";

export default createReducer([], {
  [currentMonth]: (_, { payload }) => payload,
  [filteredTransaction]: (_, { payload }) => payload,
});
