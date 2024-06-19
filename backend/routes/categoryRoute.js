import express from "express"
import { addNewCategory, getAllCategories, getCategoryProducts } from "../controllers/categoryController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/addnewcategory', protect, addNewCategory);
router.get('/allcategories', getAllCategories)
router.get('/categoryproducts/:id', getCategoryProducts)

export default router;