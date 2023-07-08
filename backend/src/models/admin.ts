import { Schema, model } from "mongoose";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { IAdminSchema, IAdminMethods, TAdminModel } from "src/interfaces/models/admin";


const adminSchema = new Schema<IAdminSchema, TAdminModel, IAdminMethods>({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 7
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        default: uuidv4()
    }
}, { timestamps: true });

adminSchema.virtual('password')
    .set(function (plainPassword: string): void {
        const hashedPassword = this.encryptPassword(plainPassword);
        if (hashedPassword) {
            this.hashed_password = hashedPassword;
        } else {
            throw new Error('Password is not valid');
        }
    });

adminSchema.methods = {
    encryptPassword (plainPassword: string): string {
        if (!plainPassword) return "";
        try {
            return crypto.createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    authenticate (plainPassword: string): boolean {
        if (!this.hashed_password) return false;
        const hashedPassword = this.encryptPassword(plainPassword);
        if (hashedPassword) return crypto.timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(this.hashed_password));
        return false;
    }
};

const Admin = model<IAdminSchema, TAdminModel>('Admin', adminSchema);

export default Admin;