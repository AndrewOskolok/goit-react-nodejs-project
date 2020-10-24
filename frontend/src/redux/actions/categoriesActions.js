import { createAction } from "@reduxjs/toolkit";
import { GET_CATEGORIES, EDIT_BALANCE } from "../constants/categoriesConstants";

const getCategories = createAction(GET_CATEGORIES, (payload) => ({payload: payload.data}));
const editCurrentBalance = createAction(EDIT_BALANCE, (payload) => ({payload: payload.balanceAfter}));


export default {
  getCategories,
  editCurrentBalance
};
