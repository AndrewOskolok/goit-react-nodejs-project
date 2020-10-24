export const getUserState = (state) => state.user;

const categoriesSelector = (state) => state.categories;
const currentBalanceSelector = (state) => state.user.currentBalance;

export default {categoriesSelector, currentBalanceSelector};
