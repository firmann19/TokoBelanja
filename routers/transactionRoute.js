const TransactionController = require("../controllers/transactionController");
const AdminAuthorization = require("../middlewares/adminAuthorization");
const authentication = require("../middlewares/authentication");
const transactionAuthorization = require("../middlewares/transactionAuthorization");
const router = require("express").Router();

router.use(authentication)

router.post('/transactions', TransactionController.createTransaction)
router.get('/transactions/user', TransactionController.getUserProduct)

router.use('/transactions/admin', AdminAuthorization)

router.get('/transactions/admin', TransactionController.getAdminProduct)

router.use('/transactions/:transactionId', transactionAuthorization)
router.get('/transactions/:transactionsId', TransactionController.getOneTransactionProduct)

module.exports = router