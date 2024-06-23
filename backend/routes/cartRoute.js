import express from 'express'
import { addToCart, deleteCartProduct, fetchUserCart, updateCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add-to-cart', addToCart)
router.post('/updatecart/:productId', updateCart)
router.get("/fetch-cart/:id", fetchUserCart)
router.post('/delete-cart-product/:productId', deleteCartProduct);

export default router;