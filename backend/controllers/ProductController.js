import mongoose from "mongoose";
import Category from "../models/CategorySchema.js";
import Product from "../models/ProductSchema.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        if (products.length === 0) {
            return res.status(404).json({ error: "No Products found !" })
        }
        res.status(201).json(products)
    } catch (err) {
        console.log("Error in getting all products ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const addNewProduct = async (req, res) => {
    try {
        const { title, thumbnail, images, price, description, category, stock, rating } = req.body;
        // console.log(req.body);
        if (!title || !thumbnail || !images.length || !price || !description || !category) {
            return res.status(400).json({ error: "Fill all the fields !" })
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Category does not exists!" });
        }
        const categoryCheck = await Category.findById(category);

        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({ error: "Product already exists!" });
        }
        const newProduct = new Product({ title, thumbnail, images, price, description, category: category, stock, rating })
        await newProduct.save();

        categoryCheck.products.push(newProduct._id);
        await categoryCheck.save()

        res.status(201).json({ newProduct });
    } catch (err) {
        console.log("Error in adding new product ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, thumbnail, images, price, description, category, stock, rating } = req.body;
        // console.log(req.body);
        if (!title || !thumbnail || !images.length || !price || !description || !category || stock === undefined || rating === undefined) {
            return res.status(400).json({ error: "Fill all the fields !" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Product does not exists!" });
        }

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product does not exist!" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { title, thumbnail, images, price, description, category: category, stock, rating }, { new: true, runValidators: true })

        res.status(200).json({ updatedProduct });
    } catch (err) {
        console.log("Error in updating product ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Product does not exists!" });
        }
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(400).json({ error: "Product does not exists!" });
        }
        const relatedProducts = await Product.find({
            category: product.category._id,
            _id: { $ne: product._id }
        }).limit(4);

        res.status(200).json({ product, relatedProducts });

    } catch (err) {
        console.log("Error in getting single product ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Product does not exists!" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ error: "Product does not exists!" });
        }
        await Category.updateOne({ _id: product.category }, { $pull: { products: id } })
        await product.deleteOne({ _id: id })
        return res.status(200).json({ message: "Product Deleted Successfully" });

    } catch (err) {
        console.log("Error in deleting product ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const getSearchProduct = async (req, res) => {
    try {
        const { query } = req.params;
        const regexPattern = new RegExp(query, "i");

        const products = await Product.find({ title: { $regex: regexPattern } });
        if (products.length === 0) {
            return res.status(404).json({ error: "No products found!" });
        }
        res.status(200).json({ products });
    } catch (err) {
        console.log("Error in getting search products: " + err.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};