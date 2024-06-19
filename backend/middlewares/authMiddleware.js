import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'

const protect = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch (err) {
                res.status(401).json({ error: "Unauthorized! - Invalid Token!" })
            }
        } else {
            res.status(401).json({ error: "No Token! Unauthorized!" })
        }
    } catch (err) {
        console.error("ERROR in TOKEN AUTHENTICATION (auth Middleware)-- ", err.message);
        res.status(401).json({ error: "Token authentication problem!" })
    }
}
export default protect;