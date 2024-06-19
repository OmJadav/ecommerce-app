import { addNewProduct, deleteProduct, getAllProducts, getSearchProduct, getSingleProduct, updateProduct } from "../controllers/ProductController.js";
import express from "express"
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/allproducts', getAllProducts)
router.post('/addnewproduct', protect, addNewProduct)
router.post('/updateproduct/:id', protect, updateProduct)
router.get('/product/:id', getSingleProduct)
router.patch('/deleteproduct/:id', protect, deleteProduct)
router.get("/search/:query", getSearchProduct);
export default router;