import { createAction } from "@reduxjs/toolkit";
import {
  GET_CATEGORIES,
  EDIT_BALANCE,
  EDIT_TRANSACTION,
} from "../constants/transactionFormConstants";

const getCategories = createAction(GET_CATEGORIES, (payload) => ({
  payload: payload.data,
}));
const editCurrentBalanceOnAdd = createAction(EDIT_BALANCE, (payload) => {
  console.log("payloadInAction", payload);
  return payload.balanceAfter;
});

const editCurrentBalanceOnEdit = createAction(EDIT_BALANCE, (payload) => {
  console.log("payloadInAction", payload);
  return payload.currentBalance;
});

const editTransaction = createAction(EDIT_TRANSACTION, (payload) => payload);

export default {
  getCategories,
  editCurrentBalanceOnAdd,
  editTransaction,
  editCurrentBalanceOnEdit
};
