import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;





export const authenticateToken = (req, res, next) => {

    const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

