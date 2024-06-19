import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 10,
    },
    rating: {
        type: Number,
        default: 3,
    },
    images: [],

}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;