

import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
      interface User {
        _id?: string;
        role?: string;
      }
    }
  }


export const authorizeRoles = (...roles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const u = (req as any).user as Express.User | undefined;
        if (!u || !roles.includes(u.role || "")) {
            return next(
                new AppError(
                    `Role (${u?.role}) is not authorized to access this route`,
                    403
                )
            );
        }
        next();


    }
}