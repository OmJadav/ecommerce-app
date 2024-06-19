import User from "../models/UserSchema.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "Please Fill All the fields!" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User Already Exists!" })
        }
        const newUser = new User({ firstName, lastName, email, password })
        const createdUser = await newUser.save();
        if (createdUser) {
            generateToken(res, createdUser._id);
            return res.status(201).json({ _id: createdUser._id, firstName: createdUser.firstName, lastName: createdUser.lastName, email: createdUser.email, message: "User registered successfully!" });

        }
        // res.status(200).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Error in signup ::", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            return res.status(201).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, addresses: user.addresses, message: "User Authorized" });
        } else {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }
    } catch (err) {
        console.error("Error in login", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}
export const logoutUser = async (req, res, next) => {
    try {
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
        return res.status(200).json({ message: "User Logged Out" })
    } catch (err) {
        console.error("Error in logout ::", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}