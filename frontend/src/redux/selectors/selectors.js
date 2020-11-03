export const getUserState = (state) => state.user;
export const getErrorMessage = (state) => state.error;


const categoriesSelector = (state) => state.categories;
const currentBalanceSelector = (state) => state.user.currentBalance;
const tokenSelector = (state) => state.user.accessToken;

export default {categoriesSelector, currentBalanceSelector, tokenSelector};
