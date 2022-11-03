const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/userAuthorization");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);

router.use(authentication);

router.patch("/users/topup", UserController.topup);

router.use(authorization)

router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;
