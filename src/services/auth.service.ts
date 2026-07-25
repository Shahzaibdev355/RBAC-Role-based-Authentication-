
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

        const { userName, password, role } = userData;

        return {
            success: true,
            user: {
                userName: user.firstName,
                role: user.role,
            }
        };

    }

    async login(loginData: LoginUserInput): Promise<AuthResponse> {

        const { userName, password } = loginData;


        return {
            success: true,
            accesstoken: accessToken,
            refreshToken,
            user: {
                userName: user.firstName,
                role: user.role,
            }
        };


    }




}


export const authService = new AuthService();