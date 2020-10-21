import { createAction } from "@reduxjs/toolkit";
import { GET_CATEGORIES } from "../constants/constants";

const getCategories = createAction(GET_CATEGORIES, (payload) => ({payload: payload.data}));

export default {
  getCategories,
};
