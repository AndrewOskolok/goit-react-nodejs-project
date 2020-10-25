import { createReducer } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";
import balanceAction from "../actions/categoriesActions.js";
import { editCurrentBalance } from "../actions/transactionActions";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (_, { payload }) => payload,
  [balanceAction.editCurrentBalance]: (state, { payload }) => ({
    ...state,
    currentBalance: payload,
  }),
  [editCurrentBalance]: (state, { payload }) => ({
    ...state,
    currentBalance: payload,
  }),
});
