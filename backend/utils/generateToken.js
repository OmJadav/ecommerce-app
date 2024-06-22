import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1 * 60 * 60 * 1000,
        });
    } catch (error) {
        console.error("Error generating token:", err);
        res.status(401).json({ error: "Error generating token" });
    }
}
export default generateToken;