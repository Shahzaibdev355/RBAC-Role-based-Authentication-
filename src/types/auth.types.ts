
export interface RegisterUserInput{
    userName: string;
    password: string;
    role: string;
}


export interface RegisterAuthResponse {
    success: boolean;
    user: {
      userName: string;
      role: string;
    };
  }
  


export interface LoginUserInput{
    userName: string;
    password: string;
}


export interface AuthResponse {
    success: boolean;
    accesstoken: string;
    refreshToken: string;
    user: {
      userName: string;
      role: string;
    };
  }