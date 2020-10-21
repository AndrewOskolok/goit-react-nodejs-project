import { getStatistic } from '../actions/statisticAction';
import { loaderToggle } from '../actions/loaderAction';
import axios from 'axios';
axios.defaults.baseURL =
  'https://goit-react-nodejs-project.herokuapp.com/transactions/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjkwNDlhOWQ2NTY4YTAwMTcwMjk2MzEiLCJpYXQiOjE2MDMyOTE1NjEsImV4cCI6MTYwMzI5MzM2MX0.0VrpLw9xumPlOtmJChU8ezWEvDttl1siVDlJejjGsOA';
const getFilteredStatistic = params => async dispatch => {
  try {
    // dispatch(loaderToggle());
    const result = await axios.get(
      `statistic?year=${params.year}&month=${params.month}`,
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
