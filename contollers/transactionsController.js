const {
  getMonthTransactions,
  addTransaction,
  getMonthCategoriesSum,
  deleteTransaction,
  getSummary,
} = require('../services/transactions');

class TransactionController {
  async addTransactionCtrl(req, res) {
    const { _id: id } = req.user;
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const result = await addTransaction({ ...req.body, owner: id });

    res.status(201).json({
      status: 'success',
      data: result,
    });
  }

  async deleteTransactionCtrl(req, res) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const result = await deleteTransaction({ id, userId });

    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted',
      data: result,
    });
  }

  async getMonthTransactionsCtrl(req, res) {
    const { _id: id } = req.user;
    const { year, month, day } = req.params;
    const result = await getMonthTransactions({ year, month, day, id });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  async getMonthCategoriesSumCtrl(req, res) {
    const { _id: id } = req.user;
    const { year, month } = req.params;
    const result = await getMonthCategoriesSum({
      year,
      month,
      id,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  async getSummaryCtrl(req, res) {
    const { _id: id } = req.user;

    const result = await getSummary({ id });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }
}

module.exports = new TransactionController();
