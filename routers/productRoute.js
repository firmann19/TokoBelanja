const ProductController = require("../controllers/productController");
const AdminAuthorization = require("../middlewares/adminAuthorization");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.use(authentication);
router.use("/products", AdminAuthorization);

router.get("/products", ProductController.getProduct);
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct);
router.patch("/products/:id", ProductController.patchProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router
