import { createAction } from "@reduxjs/toolkit";
import {
  GET_CATEGORIES,
  EDIT_BALANCE,
  EDIT_TRANSACTION,
} from "../constants/transactionFormConstants";

export const getCategories = createAction(GET_CATEGORIES, (payload) => ({
  payload: payload.data,
}));

export const editBalanceOnAdd = createAction(EDIT_BALANCE, (payload) => ({
  payload: payload.balanceAfter,
}));

export const editBalanceOnEdit = createAction(EDIT_BALANCE, (payload) => ({
  payload: payload.currentBalance,
}));

export const editTransaction = createAction(
  EDIT_TRANSACTION,
  (payload) => ({payload: payload.updatedTransaction})
);
