import express from "express"
import { addNewCategory, getAllCategories, getCategoryProducts } from "../controllers/categoryController.js";
const router = express.Router();

router.post('/addnewcategory', addNewCategory);
router.get('/allcategories', getAllCategories)
router.get('/categoryproducts/:id', getCategoryProducts)

export default router;