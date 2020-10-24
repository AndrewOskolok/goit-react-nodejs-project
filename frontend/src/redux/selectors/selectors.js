export const getUserState = (state) => state.user;

const categoriesSelector = (state) => state.categories;
const currentBalanceSelector = (state) => state.user.currentBalance;
const tokenSelector = (state) => state.user.accessToken;

export default {categoriesSelector, currentBalanceSelector, tokenSelector};
