const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);

router.use(authentication);

module.exports = router;
