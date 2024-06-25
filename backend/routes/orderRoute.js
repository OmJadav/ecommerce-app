import express from 'express'
import { createOrder } from '../controllers/orderController.js';
const router = express.Router();


router.post('/new-order', createOrder)

export default router;