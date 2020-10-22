import { getStatistic } from '../actions/statisticAction';
import { loaderToggle } from '../actions/loaderAction';
import axios from 'axios';
axios.defaults.baseURL = 'https://goit-react-nodejs-project.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjkxMzQ3NGExMzNkZTAwMTc2MWE1NWMiLCJpYXQiOjE2MDMzNTE2NjgsImV4cCI6MTYwMzM1MzQ2OH0.yIvkiydqgqY0dszqO9F_s-JWnkcMaWgbJ7pWi1HtPgE';
const getFilteredStatistic = params => async dispatch => {
  try {
    // dispatch(loaderToggle());

    const result = await axios.get(
      `/transactions/statistic?year=${params.year}&month=${params.month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(result.data);

    dispatch(getStatistic(result.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('get new token with refresh token');
    }
  } finally {
    // dispatch(loaderToggle());
  }
};

export default getFilteredStatistic;
