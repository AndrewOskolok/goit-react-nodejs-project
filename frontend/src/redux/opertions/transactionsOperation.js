import axios from "axios";
import { errorOn } from "../actions/errorAction";
import { loaderToggle } from "../actions/loaderAction";
import {
  currentMonth,
  deleteTransaction,
  editCurrentBalance,
  filteredTransaction,
} from "../actions/transactionActions";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

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

    dispatch(currentMonth(data));
  } catch (error) {
    dispatch(errorOn(error));
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

    dispatch(filteredTransaction(transactions.data));
  } catch (error) {
    dispatch(errorOn(error));
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
    const data = await axios({
      method: "delete",
      url: `/transactions/${transactionId}`,
      headers: {
        Authorization: token,
      },
    });

    if (data.status === 201) {
      const newTransactionsList = transactions.filter(
        (item) => item.id !== transactionId
      );
      dispatch(deleteTransaction(newTransactionsList));
      dispatch(editCurrentBalance(data));
    }
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderToggle());
  }
};
