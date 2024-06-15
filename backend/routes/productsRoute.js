import { addNewProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/ProductController.js";
import express from "express"

const router = express.Router();

router.get('/allproducts', getAllProducts)
router.post('/addnewproduct', addNewProduct)
router.post('/updateproduct/:id', updateProduct)
router.get('/product/:id', getSingleProduct)
router.patch('/deleteproduct/:id', deleteProduct)
export default router;