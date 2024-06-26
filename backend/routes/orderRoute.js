import express from 'express'
import { cancelOrderByUser, createOrder, fetchAllOrders, fetchOrderByUser, updateOrder } from '../controllers/orderController.js';
import protect, { admin } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/new-order', protect, createOrder)
router.put('/update-order', protect, admin, updateOrder)
router.post('/cancel-order', protect, cancelOrderByUser)
router.get('/all-orders', protect, admin, fetchAllOrders)
router.get('/fetch-user-order/:userId', protect, fetchOrderByUser)
export default router;