import axios from 'axios';
import { getStatistic } from '../actions/statisticAction';
axios.defaults.baseURL = 'https://goit-react-nodejs-project.herokuapp.com';

const getFilteredStatistic = params => async (dispatch, getState) => {
  const state = getState();
  const token = state.user.accessToken;
  if (!token) {
    return;
  }
  params.setLoader(true);

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
    if (error.response.status === 401) {
      params.setError(404);
      params.setNothingToShow('Авторизируйтесь');
      return;
    }

    if (error.response.status === 500) {
      params.setError(500);
      params.setNothingToShow('проблемы на сервере.');
    }
  } finally {
    params.setLoader(false);
  }
};

export default getFilteredStatistic;
