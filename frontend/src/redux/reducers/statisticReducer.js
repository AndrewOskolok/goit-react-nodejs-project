import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { getStatistic, clearStatistic } from '../actions/statisticAction';

const items = createReducer([], {
  [getStatistic]: (state, { payload }) => payload.categories,
  [clearStatistic]: () => [],
});
const typeOfAmount = createReducer(
  { income: 0, expense: 0 },
  {
    [getStatistic]: (state, { payload }) => payload.sumType,
    [clearStatistic]: () => ({ income: 0, expense: 0 }),
  },
);
const balance = createReducer(0, {
  [getStatistic]: (state, { payload }) => payload.currentBalance,
  [clearStatistic]: () => 0,
});

export default combineReducers({
  items,
  balance,
  typeOfAmount,
});
