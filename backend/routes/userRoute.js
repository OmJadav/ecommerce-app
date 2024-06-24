import express from "express"
import { fetchUserById, updateUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get('/profile/:id', protect, fetchUserById);
router.post('/update-user/:id', protect, updateUser);


export default router;
