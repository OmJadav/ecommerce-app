import express from "express"
import { addNewCategory, getAllCategories, getCategoryProducts } from "../controllers/categoryController.js";
import protect, { admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/addnewcategory', protect, admin, addNewCategory);
router.get('/allcategories', getAllCategories)
router.get('/categoryproducts/:id', getCategoryProducts)

export default router;