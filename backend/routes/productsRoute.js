import { addNewProduct, deleteProduct, getAllProducts, getSearchProduct, getSingleProduct, updateProduct } from "../controllers/ProductController.js";
import express from "express"
import protect, { admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/allproducts', getAllProducts)
router.post('/addnewproduct', protect, admin, addNewProduct)
router.post('/updateproduct/:id', protect, admin, updateProduct)
router.get('/product/:id', getSingleProduct)
router.patch('/deleteproduct/:id', protect, admin, deleteProduct)
router.get("/search/:query", getSearchProduct);
export default router;