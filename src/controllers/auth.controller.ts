import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import config from "../config/index";
import { authService } from "@/services/auth.service";



export const register =  asyncHandler(async (req: Request, res: Response)=>{

    const result =  authService.register(req.body)

    res.status(201).json(result)

})


export const login =  asyncHandler(async (req: Request, res: Response)=>{
    
    const result =  authService.login(req.body)

    res.status(200).json(result)

})
