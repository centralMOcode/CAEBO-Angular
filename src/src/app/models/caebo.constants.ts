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
}