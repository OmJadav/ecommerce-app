import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: { type: [mongoose.Schema.Types.Mixed], required: true },
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalItems: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
    orderStatus: { type: String, enum: ["pending", "confirmed", "dispatched", "delivered", "cancelled"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "card"], required: true },
    paymentStatus: { type: String, enum: ["pending", "received", "cancelled"], default: "pending" },
},
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;