import jwt from "jsonwebtoken";

export const doctorAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized - Malformed token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_DOCTOR);
        req.doctorId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized - Invalid token" });
    }
};
