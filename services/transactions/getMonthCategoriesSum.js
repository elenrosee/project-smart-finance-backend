const { transactionsData } = require('../../helpers');
const { Transaction } = require('../../models');

const getMonthCategoriesSum = async ({ year, month, id }) => {
  const allIncomeTransactions = await Transaction.find({
    year,
    month,
    type: 'income',
    owner: id,
  });

  const allCostsTransactions = await Transaction.find({
    year,
    month,
    type: 'costs',
    owner: id,
  });

  const result = {
    income:
      allIncomeTransactions.length > 0
        ? transactionsData(allIncomeTransactions)
        : [],
    costs:
      allCostsTransactions.length > 0
        ? transactionsData(allCostsTransactions)
        : [],
  };
  return result;
};

module.exports = getMonthCategoriesSum;
