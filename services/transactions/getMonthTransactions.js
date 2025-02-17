const { Transaction } = require('../../models');

const getMonthTransactions = async ({ year, month, day, id }) => {
  const searchData = { year, month, day, owner: id };

  const transactions = await Transaction.find(searchData);
  if (!transactions[0]) {
    return [];
  }

  return transactions;

  // const transactionsWithFullDate = arr =>
  //   arr.map(el => {
  //     const fullDate = { date: [el.day, el.month, el.year].join('.') };
  //     // eslint-disable-next-line node/no-unsupported-features/es-syntax
  //     return { ...el._doc, ...fullDate };
  //   });

  // let total = 0;
  // if (transactions.length === 1) {
  //   total = transactions[0].sum;
  // } else {
  //   total = transactions.reduce((a, b) => ({ sum: a.sum + b.sum })).sum;
  // }

  // return type === 'all'
  //   ? { transactions: transactionsWithFullDate(transactions) }
  //   : { transactions: transactionsWithFullDate(transactions), total };
};

module.exports = getMonthTransactions;
