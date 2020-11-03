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
    if (error.response.status === 500) {
      params.setError(500);
      params.setNothingToShow('Server capoot');
    }
  } finally {
  }
};

export default getFilteredStatistic;
