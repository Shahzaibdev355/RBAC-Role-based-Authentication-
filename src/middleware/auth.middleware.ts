import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { logger } from "@/utils/logger";
import config from "@/config";
import { User } from "@/models/user.model";



export interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}


export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {

    try {


        let token: string | undefined;

        // Check for token in headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            // if (!token) {
            //     return res
            //         .status(401)
            //         .json({ message: 'no token, authorization denied!' })
            // }

        }


        console.log("Authorization header:", req.headers.authorization);

        // Make sure token exists
        if (!token) {
            return next(new AppError("Not authorized to access this route", 401));
        }


        try {

            // verify token
            const decoded = jwt.verify(token, config.JWT_SECRET) as TokenPayload

            // Get user from database
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return next(new AppError("User not found", 404));
            }

            // Add user to request object
            (req as any).user = user;
            next();


        } catch (error: any) {

            logger.error(`JWT Verification Error: ${error.message}`);
            return next(
                new AppError("Not authorized, token invalid or expired", 401)
            );

        }


    } catch (error: any) {
        logger.error(`Auth Middleware Error: ${error.message}`);

        return next(new AppError("Authentication error", 500));
    }

}


// export const authorize = () => {

// }