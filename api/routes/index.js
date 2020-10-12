const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const transactionController = require('../controllers/transactions');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.get('/transactions/{:name}', transactionController.getHistory);
router.post('/transactions/{:name}', transactionController.makeTransaction);
router.get('/transactions/{:name}/{:id}', transactionController.transactionId);
router.get('/transactions-balance/{:name}', transactionController.getBalance);

module.exports = router;
