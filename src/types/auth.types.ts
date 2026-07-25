import { UserRole } from "../models/user.model";


export interface RegisterUserInput{
    userName: string;
    email : string;
    password: string;
    role: UserRole;
}


export interface RegisterAuthResponse {
    success: boolean;
    user: {
      userName: string;
      email: string;
      role: UserRole;
    };
  }
  


export interface LoginUserInput{
    userName: string;
    email: string;
    password: string;
}


export interface AuthResponse {
    success: boolean;
    accesstoken: string;
    refreshToken: string;
    user: {
      userName: string;
      email: string;
      role: UserRole;
    };
  }