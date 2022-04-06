const express = require('express');

const {
  getMonthCategoriesSumCtrl,
  getMonthTransactionsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
  getMonthTotalAmountsCtrl,
} = require('../../contollers/transactionsController');

const { asyncWrapper } = require('../../helpers');
const { authMiddleware, ValidationMiddlewares } = require('../../middlewares');
const { joiTransactionSchema } = require('../../models/transaction');

const router = express.Router();

// get AllUserTransactions by year/month/day
router.get(
  '/:year/:month/:day',
  authMiddleware,
  asyncWrapper(getMonthTransactionsCtrl),
);

// no need in this route ???
router.get(
  '/:year/:month/:type/data',
  authMiddleware,
  asyncWrapper(getMonthCategoriesSumCtrl),
);

router.get('/summary', authMiddleware, asyncWrapper(getMonthTotalAmountsCtrl));

router.post(
  '/',
  authMiddleware,
  ValidationMiddlewares(joiTransactionSchema),
  asyncWrapper(addTransactionCtrl),
);

router.delete('/:id', authMiddleware, asyncWrapper(deleteTransactionCtrl));

module.exports = router;
