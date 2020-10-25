import { createAction } from "@reduxjs/toolkit";
import {
  GET_CURRENT_MONTH,
  GET_FILTERED_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  ADD_CURRENT_TRANSACTION,
} from "../constants/transactionConstants";

export const currentMonth = createAction(GET_CURRENT_MONTH);
export const filteredTransaction = createAction(GET_FILTERED_TRANSACTIONS);
export const deleteTransaction = createAction(DELETE_TRANSACTIONS);
export const addTransaction = createAction(ADD_CURRENT_TRANSACTION);
