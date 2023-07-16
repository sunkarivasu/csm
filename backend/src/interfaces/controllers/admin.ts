export interface IAdminRegistration {
    name: string;
    email: string;
    password?: string;
    allow_password_change?: boolean;
};

export interface IAdminLogin {
    email: string;
    password: string;
};

export interface IUpdateAdminPassword {
    password: string;
    token: string;
};

export interface IVerifyOtpHash {
    email: string;
    otp: string;
    otpHash: string;
};

export interface IResetAdminPassword {
    email: string;
    password: string;
    otp: string;
    otpHash: string;
};