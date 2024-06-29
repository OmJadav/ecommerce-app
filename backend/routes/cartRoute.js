import express from 'express'
import { addToCart, deleteCartProduct, fetchUserCart, updateCart } from '../controllers/cartController.js';
import protect from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/add-to-cart', protect, addToCart)
router.post('/updatecart/:productId', protect, updateCart)
router.get("/fetch-cart/:id", protect, fetchUserCart)
router.post('/delete-cart-product/:productId', protect, deleteCartProduct);

export default router;