import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { getStatistic } from '../actions/statisticAction';

const items = createReducer([], {
  [getStatistic]: (state, { payload }) => payload.categories,
});
const typeOfAmount = createReducer(
  { income: 0, expense: 0 },
  {
    [getStatistic]: (state, { payload }) => payload.sumType,
  },
);
const balance = createReducer(0, {
  [getStatistic]: (state, { payload }) => payload.currentBalance,
});

export default combineReducers({
  items,
  balance,
  typeOfAmount,
});
