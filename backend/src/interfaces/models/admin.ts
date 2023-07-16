import { Model } from 'mongoose';

export interface IAdminSchema {
    name: string;
    email: string;
    hashed_password: string;
    allow_password_change: boolean;
    password?: string;
    role: 'super_admin' | 'admin';
    salt: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface IAdminMethods {
    encryptPassword(password: string): string;
    authenticate(plainPassword: string): boolean;
}

export type TAdminModel = Model<IAdminSchema, {}, IAdminMethods>;