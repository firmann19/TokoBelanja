const authorization = require("../middlewares/userAuthorization");
const router = require("express").Router();

router.use(authorization);

module.exports = router;
