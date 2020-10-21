import { combineReducers } from "@reduxjs/toolkit";
import loader from "./loaderReducer";
import currentMonthTransactions from "./transactionsReduser";

export const rootReducer = combineReducers({
  loader,
  transactions: currentMonthTransactions,
});
