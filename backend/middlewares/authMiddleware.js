import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'

const protect = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        // console.log(token);
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch (error) {
                res.status(401).json({ error: "Unauthorized! - Invalid Token!" })
            }
        } else {
            res.status(401).json({ error: "No Token! Unauthorized!" })
        }
    } catch (error) {
        console.error("ERROR in TOKEN AUTHENTICATION (auth Middleware)-- ", error.message);
        res.status(401).json({ error: "Token authentication problem!" })
    }
}

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ad@min#') {
        next();
    } else {
        res.status(403).json({ error: "Access denied! - Admins only" });
    }
}
export default protect;