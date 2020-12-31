export interface ApiResponse<t> {
    statusCode: number;
    statusDesc: string;
    message: t;
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    groupName: string;
    groupAdmin: number;
}

export interface UserEmail {
    email: string;
    is_primary: boolean;
    is_verified: boolean;
}

export interface AuthRequest {
    email: string;
    pass: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    error?: string;
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    pass: string;
    pass2: string;
}

export interface RegisterResponse {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    error?: string;
}

export const MESSAGES = {
    GENERIC_ERROR: 'Something went wrong. Please refresh the page and try again.',
}