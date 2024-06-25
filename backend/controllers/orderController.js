import Product from "../models/ProductSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/UserSchema.js";

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
        res.status(201).json({ order: saveOrder, user });
    } catch (err) {
        console.log("Error in creating order ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}