import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return token;
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Error generating token");
    }
}
export default generateToken;