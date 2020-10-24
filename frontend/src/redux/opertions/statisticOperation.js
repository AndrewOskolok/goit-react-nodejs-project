import { getStatistic } from '../actions/statisticAction';
import axios from 'axios';
axios.defaults.baseURL = 'https://goit-react-nodejs-project.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjkzMWY3Mjk3OTQyNTAwMTdkNGZiNzgiLCJpYXQiOjE2MDM0NzczNjIsImV4cCI6MTYwMzQ3OTE2Mn0.mZ9wFINmowtIsC_ULhdAGFRxUulg5Yk_Bmzgsx7s2BA';
const getFilteredStatistic = params => async dispatch => {
  try {
    const result = await axios.get(
      `/transactions/statistic?year=${params.year}&month=${params.month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(result.data);

    // if (result.data.sumType.income === 0 && result.data.sumType.expense === 0) {
    //   params.setNothingToShow('transactions not found');
    //   params.setError(404);
    // }

    dispatch(getStatistic(result.data));
  } catch (error) {
    // if (error.response && error.response.status === 401) {
    //   console.log('get new token with refresh token');
    // }
    // if (error.response.status === 401) {
    //   params.setNothingToShow('not authorized');
    //   params.setError(404);
    // }
    // if (error.response.status === 500) {
    //   params.setError(500);
    //   params.setNothingToShow('Server capoot');
    // }
  } finally {
  }
};

export default getFilteredStatistic;
