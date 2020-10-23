import { getStatistic } from "../actions/statisticAction";
import { loaderToggle } from "../actions/loaderAction";
import axios from "axios";
axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjkyYzU4OTk3OTQyNTAwMTdkNGZiNTkiLCJpYXQiOjE2MDM0NTQzNDUsImV4cCI6MTYwMzQ1NjE0NX0.4xscnNrQATCgHd2A66G4Ms7SejZ9OvnZEQ7xkv4nuCE";
const getFilteredStatistic = (params) => async (dispatch) => {
  try {
    // dispatch(loaderToggle());

    const result = await axios.get(
      `/transactions/statistic?year=${params.year}&month=${params.month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result.data);

    dispatch(getStatistic(result.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("get new token with refresh token");
    }
  } finally {
    // dispatch(loaderToggle());
  }
};

export default getFilteredStatistic;
