const { request } = require("express");

const {transact, getTransactions, getTransactionById, getBalance} = require('../storage/transact') ;
const {tokenize} = require('../storage/user');

/**
 * Retrieve history of transactions from user
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getHistory = async(req, res) => {
  try {
    const {name} = req.params;
    const history = getTransactions(tokenize(decodeURIComponent(name)));
    return history;
  } catch (err) {
    return res.status(500).send({status: 'error', message: 'Server error'});
  }
}

/**
 * Commit new transaction to the account
 * @param {Request} req 
 * @param {Response} res 
 */
exports.makeTransaction = async(req, res) => {
  try {
    const { name, type, amount } = req.body;
    const result = await transact(tokenize(decodeURIComponent(name)), type, amount)
    return result
  } catch (err) {
    return res.status(500).send({status: 'error', message: 'Server error'});
  }
}

/**
 * Returns a single transaction object
 * @param {Request} req 
 * @param {Response} res 
 */
exports.transactionId = (req, res) => {
  try {
    const {name, id} = req.params;
    const result = getTransactionById(tokenize(decodeURIComponent(name)), id);
    if(!result) return res.status(410).send({status: 'error', message: 'transaction not found'});

    return result;
  } catch (err) {
    return res.status(500).send({status: 'error', message: 'Server error'});
  }
}

/**
 * Fetches current account balance
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getBalance = (req, res) => {
  try {
    const {name, id} = req.params;
    const balance = getBalance(tokenize(decodeURIComponent(name)));
    if(balance.last) {
      balance.lastTransaction
    }
    return balance;
  } catch (err) {
    return res.status(500).send({status: 'error', message: 'Server error'});
  }
}