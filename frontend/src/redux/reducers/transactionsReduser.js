import { createReducer } from "@reduxjs/toolkit";
import {
  currentMonth,
  filteredTransaction,
  deleteTransaction,
  addTransaction,
} from "../actions/transactionActions";

import editTransaction from "../actions/transactionFormActions";

export default createReducer([], {
  [currentMonth]: (_, { payload }) => payload,
  [filteredTransaction]: (_, { payload }) => payload,
  [deleteTransaction]: (_, { payload }) => payload,
  [addTransaction]: (state, { payload }) => [...state, payload],
  [editTransaction.editTransaction]: (state, { payload }) => {
    const transactions = state.filter((item) => item.id !== payload.id);
    return [...transactions, payload];
  },
});
