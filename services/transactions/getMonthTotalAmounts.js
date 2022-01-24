const { Transaction } = require('../../models');

const getMonthTotalAmounts = async ({ type, id }) => {
  const result = [];

  for (let i = 0; i < 6; i += 1) {
    const dateNow = new Date();

    const lastMonth = dateNow.setMonth(dateNow.getMonth() - i);

    // eslint-disable-next-line no-await-in-loop
    const allTransactions = await Transaction.find({
      year: `${new Date(lastMonth).getFullYear()}`,
      month: `${new Date(lastMonth).getMonth() + 1}`,
      type,
      owner: id,
    });

    const sum = allTransactions.reduce((acc, trans) => {
      // eslint-disable-next-line no-param-reassign
      acc += trans.sum;
      return acc;
    }, 0);

    result.push({
      year: `${new Date(lastMonth).getFullYear()}`,
      month: `${new Date(lastMonth).getMonth() + 1}`,
      sum,
    });
  }

  return result;
};

module.exports = getMonthTotalAmounts;
