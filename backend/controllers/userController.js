import Cart from "../models/CartSchema.js";
import User from "../models/UserSchema.js";


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "User Updated", user })
    } catch (err) {
        console.error("Error in Update User : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, _id: user._id, addresses: user.addresses, email: user.email, role: user.role });
    } catch (err) {
        console.error("Error in fetch user : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error in fetch user : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.deleteMany({ user: id });
        const users = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User data deleted successfully" });
    } catch (err) {
        console.error("Error in fetch user : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}