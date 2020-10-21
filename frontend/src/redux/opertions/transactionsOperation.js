import axios from "axios";
import { loaderToggle } from "../actions/loaderAction";
import {
  currentMonth,
  deleteTransaction,
  filteredTransaction,
} from "../actions/transactionActions";

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

export const getCurrentTransactions = (token) => async (dispatch) => {
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

export const getFilteredTransactions = (filter, token) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    let transactions;

    if (filter === "") {
      transactions = await axios({
        method: "get",
        url: "/transactions",
        headers: {
          Authorization: token,
        },
      });
    } else {
      transactions = await axios({
        method: "get",
        url: "/transactions",
        headers: {
          Authorization: token,
        },
        params: { filter },
      });
    }

    const newData = transactions.data.map((item) => {
      const monthNumber = monthNames.indexOf(item.month) + 1;
      const newYear = Number(String(item.year).slice(-2));
      if (item.type === "income") {
        item.type = "+";
      }
      if (item.type === "expense") {
        item.type = "-";
      }
      return { ...item, month: monthNumber, year: newYear };
    });
    dispatch(filteredTransaction(newData));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loaderToggle());
  }
};

export const deteteCurrentTransaction = (
  transactionId,
  token,
  transactions
) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    const { status } = await axios({
      method: "delete",
      url: `/transactions/${transactionId}`,
      headers: {
        Authorization: token,
      },
    });
    if (status) {
      const newTransactionsList = transactions.filter(
        (item) => item.id !== transactionId
      );
      dispatch(deleteTransaction(newTransactionsList));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loaderToggle());
  }
};
