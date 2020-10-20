import axios from "axios";
import { string } from "prop-types";
import { loaderToggle } from "../actions/loaderAction";
import { currentMonth } from "../actions/transactionAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getCurrentTransactions = (token) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    const { data } = await axios({
      method: "get",
      url: "/transactions/current-month",
      headers: {
        Authorization: token,
      },
    });

    const newData = data.map((item) => {
      const monthNumber = monthNames.indexOf(item.month) + 1;
      const newYear = Number(String(item.year).slice(-2));
      if (item.type === "income") {
        item.type = "+";
      } else if (item.type === "expense") {
        item.type = "-";
      }
      return { ...item, month: monthNumber, year: newYear };
    });
    dispatch(currentMonth(newData));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loaderToggle());
  }
};

export default getCurrentTransactions;
