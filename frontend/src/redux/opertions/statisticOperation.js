import axios from 'axios';
import { getStatistic } from '../actions/statisticAction';
import { getUser } from '../actions/userAction';
axios.defaults.baseURL = 'https://goit-react-nodejs-project.herokuapp.com';

const getFilteredStatistic = params => async (dispatch, getState) => {
  const state = getState();
  const token = state.user.accessToken;
  const sid = state.user.refreshToken;
  const user = state.user;
  try {
    const result = await axios.get(
      `/transactions/statistic?year=${params.year}&month=${params.month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch(getStatistic(result.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const result = await axios.get(`/auth/refresh`, {
        body: {
          sid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUser({ ...user, ...result.data }));
      console.log('new token', result.data);
      console.log('get new token with refresh token');
    }

    if (error.response.status === 500) {
      params.setError(500);
      params.setNothingToShow('Server capoot');
    }
  } finally {
  }
};

export default getFilteredStatistic;
