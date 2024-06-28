import express from 'express'
import { createOrder, fetchAllOrders, fetchOrderByUser } from '../controllers/orderController.js';
const router = express.Router();


router.post('/new-order', createOrder)
router.get('/all-orders', fetchAllOrders)
router.get('/fetch-user-order/:userId', fetchOrderByUser)
export default router;