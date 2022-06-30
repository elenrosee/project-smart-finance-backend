/* eslint-disable no-unused-vars */
const { formatISO, format } = require('date-fns');
const { checkUserBalance } = require('../../helpers');
const { Transaction, User } = require('../../models');
const { updateBalance } = require('../users');

const addTransaction = async body => {
  const { owner: userId, type, sum: transactionValue, day, month, year } = body;

  const isTrDateToday =
    format(new Date(), 'yyyy') === year &&
    format(new Date(), 'MM') === month &&
    format(new Date(), 'dd') === day;

  const dateISO = isTrDateToday
    ? formatISO(
        new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          format(new Date(), 'H'),
          format(new Date(), 'm'),
          format(new Date(), 's'),
        ),
      )
    : formatISO(new Date(Number(year), Number(month) - 1, Number(day)));

  const user = await User.findById(userId);

  const newUserBalance =
    type === 'income'
      ? user.balance + transactionValue
      : user.balance - transactionValue;

  if (checkUserBalance(newUserBalance)) {
    updateBalance({ id: userId, balance: newUserBalance });
    const result = await Transaction.create(Object.assign(body, { dateISO }));

    return result;
  }
};
module.exports = addTransaction;
