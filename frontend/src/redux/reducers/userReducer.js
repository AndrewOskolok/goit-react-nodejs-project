import { createReducer } from "@reduxjs/toolkit";
import { getUser, updateUser, updateUserAvatar } from "../actions/userAction";
import {
  editBalanceOnAdd,
  editBalanceOnEdit,
} from "../actions/transactionFormActions";
import { editCurrentBalance } from "../actions/transactionActions";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (_, { payload }) => payload,
  [updateUser]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [updateUserAvatar]: (state, { payload }) => ({
    ...state,
    avatarUrl: payload,
  }),
  [editBalanceOnAdd]: (state, { payload }) => {
    return { ...state, currentBalance: payload };
  },
  [editBalanceOnEdit]: (state, { payload }) => {
    return { ...state, currentBalance: payload };
  },
  [editCurrentBalance]: (state, { payload }) => ({
    ...state,
    currentBalance: payload,
  }),
});
