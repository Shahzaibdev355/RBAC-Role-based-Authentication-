
import crypto from "crypto";
import { IUser, User } from "../models/user.model";
import { AppError } from "../utils/appError";

import { RegisterUserInput, RegisterAuthResponse, LoginUserInput, AuthResponse } from "@/types/auth.types";

import {
    generateRefreshToken,
    generateAccessToken,
    verifyRefreshToken,
} from "../utils/jwt";
import { logger } from "../utils/logger";


class AuthService {


    async register(userData: RegisterUserInput): Promise<RegisterAuthResponse> {

        const { userName, email, password, role } = userData;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new AppError("User with this email already exists", 400);
        }

        // Create new user
        const user = await User.create({
            userName,
            email,
            password,
            role
        });


        return {
            success: true,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
            }
        };

    }

    async login(loginData: LoginUserInput): Promise<AuthResponse> {

        const { userName, email, password } = loginData;


        return {
            success: true,
            accesstoken: accessToken,
            refreshToken,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
            }
        };


    }




}


export const authService = new AuthService();