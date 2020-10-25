import { createAction } from "@reduxjs/toolkit";
import { GET_CATEGORIES, EDIT_BALANCE, EDIT_TRANSACTION } from "../constants/transactionFormConstants";

const getCategories = createAction(GET_CATEGORIES, (payload) => ({payload: payload.data}));
const editCurrentBalance = createAction(EDIT_BALANCE, (payload) => ({payload: payload.balanceAfter}));
const editTransaction = createAction(EDIT_TRANSACTION, (payload) => payload);


export default {
  getCategories,
  editCurrentBalance,
  editTransaction
};
