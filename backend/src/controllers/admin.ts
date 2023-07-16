import {
    decodeJwtToken,
    generateRandomPassword,
    generateJwtToken,
    generateOtp,
    generateOtpHash,
    verifyOtpHash
} from "../utils/auth";
import sendEmail from "../utils/sendEmail";
// Interfaces
import {
    IAdminRegistration,
    IAdminLogin,
    IUpdateAdminPassword,
    IVerifyOtpHash,
    IResetAdminPassword,
} from "src/interfaces/controllers/admin";
// Models
import Admin from '../models/admin';
import logger from "../utils/logger";

const registerAdmin = ({name, email, password, allow_password_change}: IAdminRegistration) => new Promise(async (resolve, reject) => {
    try {
        // Check if admin already exists
        const admin = await Admin.findOne({ email });
        if (admin) return reject({ status: 422, msg: 'Admin already exists', err: { email: 'Email already exists'} });

        // Generate password if not provided
        password = password || generateRandomPassword();

        // Update database
        let newAdmin = new Admin({
            name,
            email,
            password,
            allow_password_change
        });
        newAdmin = await newAdmin.save();

        // Send email
        await sendEmail({
            to: email,
            subject: 'Admin Registration',
            html: `
                <h1>Admin Registration</h1>
                <p>Hi ${name},</p>
                <p>You have been registered as an admin on City Super Market.</p>
                <p>Your login credentials are:</p>
                <p>Email: ${email}</p>
                <p>Password: ${password}</p>
                <p>Please login to your account and change your password.</p>
                <p>Thank you.</p>
            `
        });

        return resolve({
            id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email
        });
    } catch (err) {
        logger.error(`[AdminController][registerAdmin][${email}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

const loginAdmin = ({ email, password }: IAdminLogin) => new Promise(async (resolve, reject) => {
    try {
        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) return reject({ status: 404, msg: 'Invalid Credentials', err: { email: 'Invalid username or password', password: 'Invalid username or password'} });

        // Check if password is correct
        if (!admin.authenticate(password)) return reject({ status: 404, msg: 'Invalid Credentials', err: { email: 'Invalid username or password', password: 'Invalid username or password'} });

        const adminPayload = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            allow_password_change: admin.allow_password_change,
            role: admin.role
        };

        const jwtToken = generateJwtToken(adminPayload);

        return resolve(jwtToken);
    } catch (err) {
        logger.error(`[AdminController][loginAdmin][${email}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

const updateAdminPassword = (data: IUpdateAdminPassword) => new Promise(async (resolve, reject) => {
    try {
        const decoded = decodeJwtToken(data.token.split(' ')[1]);
        if (!decoded) return reject({ status: 401, msg: 'Invalid token', err: { token: 'Invalid token'} });

        const admin = await Admin.findOne({email: decoded.email});

        // Check if admin exists
        if (!admin) return reject({ status: 404, msg: 'Admin not found', err: { email: 'Admin not found'} });

        // check if password change is allowed
        if (!admin.allow_password_change) return reject({ status: 403, msg: 'Password change not allowed', err: { email: 'Password change not allowed'} });

        // update password
        admin.password = data.password;
        admin.allow_password_change = false;

        // save admin
        await admin.save();

        const adminPayload = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        };

        const jwtToken = generateJwtToken(adminPayload);

        return resolve(jwtToken);
    } catch (err) {
        logger.error(`[AdminController][updateAdminPassword][${data.token}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

const forgotPassword = (email: string) => new Promise(async (resolve, reject) => {
    try {
        const admin = await Admin.findOne({ email, allow_password_change: false });

        // Check if admin exists
        if (!admin) return reject({ status: 404, msg: 'Admin not found, Please register to continue', err: { email: 'User not found'} });

        // Send OTP
        const otp = generateOtp();
        const otpHash = generateOtpHash(otp, email);
        await sendEmail({
            to: email,
            subject: 'OTP for password reset',
            html: `
                <h1>OTP for password reset</h1>
                <p>Hi ${admin.name},</p>
                <p>Your OTP for password reset is:</p>
                <p>${otp}</p>
                <p>Thank you.</p>
            `
        });

        return resolve(otpHash);
    } catch (err) {
        logger.error(`[AdminController][forgotPassword][${email}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

const verifyOtp = (data: IVerifyOtpHash) => new Promise(async (resolve, reject) => {
    try {
        resolve(1);
    } catch (err) {
        logger.error(`[AdminController][verifyOtpHash] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

const resetAdminPassword = (data: IResetAdminPassword) => new Promise(async (resolve, reject) => {
    try {
        const admin = await Admin.findOne({ email: data.email, allow_password_change: false});

        // Check if admin exists
        if (!admin) return reject({ status: 404, msg: 'Admin not found, Please register to continue', err: { email: 'User not found'} });

        // verify otp
        verifyOtpHash(data.otp, data.email, data.otpHash, async (err) => {
            if (err) return reject({ status: 401, msg: 'Invalid OTP', err: { otp: err } });

            // update password
            admin.password = data.password;
            await admin.save();

            const adminPayload = {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            };

            const jwtToken = generateJwtToken(adminPayload);

            return resolve(jwtToken);
        });
    } catch (err) {
        logger.error(`[AdminController][resetAdminPassword][${data.email}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});

export {
    registerAdmin,
    loginAdmin,
    updateAdminPassword,
    forgotPassword,
    verifyOtp,
    resetAdminPassword
};