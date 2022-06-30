const { parseISO } = require('date-fns');
const { Transaction } = require('../../models');

const getAllUserTransactions = async ({ type, group, groupAmount, id }) => {
  const searchData = type === 'all' ? { owner: id } : { type, owner: id };

  const transactions = await Transaction.find(searchData);
  if (!transactions[0]) {
    return [];
  }

  const sortedByDateISOTransactions = transactions.sort(
    (newestTr, oldestTr) =>
      parseISO(oldestTr.dateISO) - parseISO(newestTr.dateISO),
  );

  const transactionsGroup = arr => {
    const trans = [];

    for (let i = (group - 1) * groupAmount; i < group * groupAmount; i += 1) {
      trans.push(arr[i]);
    }

    return trans;
  };

  return transactionsGroup(sortedByDateISOTransactions);
};

module.exports = getAllUserTransactions;
