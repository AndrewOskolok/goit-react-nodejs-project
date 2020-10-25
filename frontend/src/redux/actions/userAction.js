import { createAction } from "@reduxjs/toolkit";
import { GET_USER, UPDATE_AVATAR } from "../constants/constants";

export const getUser = createAction(GET_USER);
export const updateUserAvatar = createAction(UPDATE_AVATAR);
