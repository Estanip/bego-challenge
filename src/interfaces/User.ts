import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    generateToken(): string;
    validatePassword(password: string): boolean;
};