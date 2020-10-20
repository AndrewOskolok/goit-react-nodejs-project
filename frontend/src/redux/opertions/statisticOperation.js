import { getStatistic } from '../actions/statisticAction';
import { loaderToggle } from '../actions/loaderAction';
import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjhkZmQ2ODRhN2Y2YTA5OWFhZmMwYjMiLCJpYXQiOjE2MDMxNDA5NjgsImV4cCI6MTYwMzE0Mjc2OH0.Mqqs4dQuyBbih1bmp3XekFNHHgFBR2YuI81dxkOB_IU';
const getFilteredStatistic = params => async dispatch => {
  try {
    dispatch(loaderToggle());
    const result = await axios.get(
      `http://localhost:4000/transactions/statistic?year=${params.year}&month=${params.month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(getStatistic(result.data));
  } catch (error) {
  } finally {
    dispatch(loaderToggle());
  }
};

export default getFilteredStatistic;
