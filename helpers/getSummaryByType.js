const { format } = require('date-fns');
const ruLocale = require('date-fns/locale/ru');

const { Transaction } = require('../models');

const getSummaryByType = async (type, id) => {
  const result = [];

  for (let i = 1; i < 7; i += 1) {
    const dateNow = new Date();
    dateNow.setMonth(Number(format(dateNow, 'M')) - i);

    // eslint-disable-next-line no-await-in-loop
    const allTransactions = await Transaction.find({
      year: format(dateNow, 'yyyy'),
      month: format(dateNow, 'MM'),
      type,
      owner: id,
    });

    const sum = allTransactions.reduce((acc, trans) => {
      // eslint-disable-next-line no-param-reassign
      acc += trans.sum;
      return acc;
    }, 0);

    const monthSum = {
      month: format(dateNow, 'LLLL', { locale: ruLocale }),
      sum,
    };

    result.push(monthSum);
  }

  return result;
};

module.exports = getSummaryByType;
