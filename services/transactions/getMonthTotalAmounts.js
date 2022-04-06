const { getSummaryByType } = require('../../helpers');

const getMonthTotalAmounts = async ({ id }) => {
  const incomeSummary = getSummaryByType('income', id);
  const costsSummary = getSummaryByType('costs', id);

  return { incomeSummary, costsSummary };

  // const getSummaryByType = async (type, id) => {
  //   const result = {};
  //   for (let i = 0; i < 6; i += 1) {
  //     const dateNow = new Date();
  //     const lastMonth = dateNow.setMonth(dateNow.getMonth() - i);
  //     const month =
  //       `${new Date(lastMonth).getMonth() + 1}`.length > 1
  //         ? `${new Date(lastMonth).getMonth() + 1}`
  //         : `0${new Date(lastMonth).getMonth() + 1}`;
  //     // eslint-disable-next-line no-await-in-loop
  //     const allTransactions = await Transaction.find({
  //       year: `${new Date(lastMonth).getFullYear()}`,
  //       month,
  //       type,
  //       owner: id,
  //     });
  //     const sum = allTransactions.reduce((acc, trans) => {
  //       // eslint-disable-next-line no-param-reassign
  //       acc += trans.sum;
  //       return acc;
  //     }, 0);
  //     result[dateNow.toLocaleString('ru', { month: 'long' })] = sum;
  //   }
  //   return result;
  // };
};

module.exports = getMonthTotalAmounts;
