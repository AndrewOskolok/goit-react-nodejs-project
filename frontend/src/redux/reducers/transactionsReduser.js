import { createReducer } from "@reduxjs/toolkit";
import {
  currentMonth,
  filteredTransaction,
  deleteTransaction,
} from "../actions/transactionActions";

export default createReducer([], {
  [currentMonth]: (_, { payload }) => payload,
  [filteredTransaction]: (_, { payload }) => payload,
  [deleteTransaction]: (_, { payload }) => payload,
});
