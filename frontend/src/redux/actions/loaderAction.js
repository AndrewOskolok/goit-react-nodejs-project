import { createAction } from "@reduxjs/toolkit";
import { LOADER_TOGGLE } from "../constants/constants";

export const loaderToggle = createAction(LOADER_TOGGLE);
