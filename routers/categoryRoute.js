const CategoryController = require("../controllers/categoryController");
const AdminAuthorization = require("../middlewares/adminAuthorization");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.use(authentication);
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getCategory);

router.use('/categories/:id' , AdminAuthorization)
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

module.exports = router;
