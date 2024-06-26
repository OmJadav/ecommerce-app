import express from 'express'
import { createOrder, fetchOrderByUser } from '../controllers/orderController.js';
const router = express.Router();


router.post('/new-order', createOrder)
router.get('/fetch-user-order/:userId', fetchOrderByUser)
export default router;