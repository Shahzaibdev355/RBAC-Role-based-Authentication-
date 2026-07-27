import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import config from "../config/index";
import { authService } from "@/services/auth.service";



export const register = asyncHandler(async (req: Request, res: Response) => {

    const result = await authService.register(req.body)

    res.status(201).json(result)

})


export const login = asyncHandler(async (req: Request, res: Response) => {

    const result = await authService.login(req.body)

    const { refreshToken, ...responseData } = result;

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: config.NODE_ENV === "production" ? "none" : "lax",
        secure: config.NODE_ENV === "production",
        path: '/'
    });

    res.status(200).json(responseData)

})
