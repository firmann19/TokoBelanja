const TransactionController = require("../controllers/transactionController");
const authorization = require("../middlewares/adminAuthorization");
const authentication = require("../middlewares/authentication");
const transactionAuthorization = require("../middlewares/transactionAuthorization");

const router = require("express").Router();

router.use(authentication)
router.use('/transactions/:transactionId', transactionAuthorization)
router.use('/transactions/admin', authorization)

router.post('/transactions', TransactionController.createTransaction)
router.get('/transactions/user', TransactionController.getUserProduct)
router.get('/transactions/admin', TransactionController.getAdminProduct)
router.get('/transactions/:transactionsId', TransactionController.getOneTransactionProduct)

module.exports = router