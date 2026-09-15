import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No Token Provided",
            });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

        req.user = decode; // Set Identify Globally

        // console.log(decode);
        next();
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
