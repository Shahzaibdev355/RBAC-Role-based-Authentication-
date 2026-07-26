import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middleware/validator.middleware";
import { loginSchema, registerSchema } from "@/validations/auth.validators";

const router = express.Router()


// Public routes


router.post("/register",validate(registerSchema),  register);
router.post("/login", validate(loginSchema), login);


export default router;
