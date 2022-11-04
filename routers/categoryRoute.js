const CategoryController = require("../controllers/categoryController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/userAuthorization");
const router = require("express").Router();

router.use(authorization);
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getCategory);

router.use(authentication);
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

module.exports = router;
