const CategoryController = require("../controllers/categoryController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/adminAuthorization");
const router = require("express").Router();

router.use(authentication);
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getCategory);

router.use('/categories/:id' ,authorization)
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

module.exports = router;
