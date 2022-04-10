const { getSummaryByType } = require('../../helpers');

const getSummary = async ({ id }) => {
  const income = await getSummaryByType('income', id);
  const costs = await getSummaryByType('costs', id);

  return { income, costs };
};

module.exports = getSummary;
