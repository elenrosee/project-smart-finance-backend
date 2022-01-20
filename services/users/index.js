const userRegister = require('./registration');
const userLogin = require('./login');
const userLogout = require('./logout');
const updateBalance = require('./updateBalance');
const getCurrentUser = require('./getCurrentUser');

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  updateBalance,
  getCurrentUser,
};