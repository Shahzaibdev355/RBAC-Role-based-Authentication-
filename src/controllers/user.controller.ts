import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";


export const admin = asyncHandler(async(req: Request, res: Response)=>{

    res.json({message: 'welcome admin'})

})


// admin + manager can access
export const manager = asyncHandler(async(req: Request, res: Response)=>{

    res.json({message: 'welcome manager'})

})


// all can access
export const employee = asyncHandler(async(req: Request, res: Response)=>{

    res.json({message: 'welcome employee'})

})