import { combineReducers } from '@reduxjs/toolkit';
import loader from './loaderReducer';
import statistics from './statisticReducer';
export const rootReducer = combineReducers({
  loader,
  statistics,
});
