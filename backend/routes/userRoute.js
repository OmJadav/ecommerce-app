import express from "express"
import { allUsers, deleteUser, fetchUserById, updateUser } from "../controllers/userController.js";
import protect, { admin } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get('/profile/:id', protect, fetchUserById);
router.get('/all', protect, admin, allUsers);
router.delete('/delete/:id', protect, admin, deleteUser);
router.post('/update-user/:id', protect, updateUser);


export default router;
