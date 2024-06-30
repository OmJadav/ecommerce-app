import express from 'express';
import { createPromocode, deletePromocode, getAllPromocodes } from '../controllers/promocodeController.js';
import protect, { admin } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Routes for Promocodes
router.post('/promocodes', protect, admin, createPromocode);
router.get('/promocodes', protect, admin, getAllPromocodes);
router.delete('/promocodes/:id', protect, admin, deletePromocode);

export default router;
