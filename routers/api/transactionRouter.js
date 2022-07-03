const express = require('express');

const {
  getAllUserTransactionsCtrl,
  getMonthCategoriesSumCtrl,
  getMonthTransactionsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
  getSummaryCtrl,
} = require('../../contollers/transactionsController');

const { asyncWrapper } = require('../../helpers');
const { authMiddleware, ValidationMiddlewares } = require('../../middlewares');
const { joiTransactionSchema } = require('../../models/transaction');

const router = express.Router();

// get all last userTransactions by ':type' and sorted by dateISO, will return some :group width needed :amount of transactions
router.get(
  '/:type/:group/:groupAmount',
  authMiddleware,
  asyncWrapper(getAllUserTransactionsCtrl),
);

// get AllUserTransactions by year/month/day
router.get(
  'fromDay/:year/:month/:day',
  authMiddleware,
  asyncWrapper(getMonthTransactionsCtrl),
);

// get sum of costs/income by year and month
router.get(
  '/:year/:month',
  authMiddleware,
  asyncWrapper(getMonthCategoriesSumCtrl),
);

router.get('/summary', authMiddleware, asyncWrapper(getSummaryCtrl));

router.post(
  '/',
  authMiddleware,
  ValidationMiddlewares(joiTransactionSchema),
  asyncWrapper(addTransactionCtrl),
);

router.delete('/:id', authMiddleware, asyncWrapper(deleteTransactionCtrl));

module.exports = router;
