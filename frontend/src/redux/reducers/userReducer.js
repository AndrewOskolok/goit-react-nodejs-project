import { createReducer } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";
import balanceAction from "../actions/transactionFormActions";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (_, { payload }) => payload,
  [balanceAction.editCurrentBalance]: (state, { payload }) => {
    console.log("payload", payload);
    return { ...state, currentBalance: payload };
  },
});
