import Product from "../models/ProductSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/UserSchema.js";
import Cart from "../models/CartSchema.js";
import mongoose from 'mongoose';
export const createOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        const order = new Order(newOrder);
        // console.log(order);
        for (let item of order.items) {
            const product = await Product.findOne({ _id: item.product._id })
            if (!product) {
                return res.status(400).json({ error: "Product not found" })
            }
            if (item.quantity > product.stock) {
                return res.status(400).json({ error: "Out of Stock" })
            }
            await product.updateOne({ $inc: { stock: -item.quantity } })
        }
        const saveOrder = await order.save();
        const user = await User.findById(order.user);

        await Cart.deleteMany({ user: order.user });

        res.status(201).json({ order: saveOrder, user });
    } catch (err) {
        console.log("Error in creating order ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const fetchOrderByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        const userOrder = await Order.find({ user: userId })

        if (userOrder.length === 0) {
            return res.status(404).json({ error: "No orders were made!" });
        }
        res.status(200).json({ userOrder });
    } catch (error) {
        console.log("Error in fetching user orders ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}

export const fetchAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders.length < 1) {
            return res.status(401).json({ error: "Orders are not available!" })
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.log("Error in fetching All orders ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}