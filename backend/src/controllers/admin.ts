// Interfaces
import { IAdminRegistration } from "src/interfaces/controllers/admin";
// Models
import Admin from '../models/admin';
import logger from "../utils/logger";

export const registerAdmin = ({name, email, password}: IAdminRegistration) => new Promise(async (resolve, reject) => {
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            return reject({ status: 422, msg: 'Admin already exists', err: { email: 'Email already exists'} });
        }

        let newAdmin = new Admin({
            name,
            email,
            password
        });

        newAdmin = await newAdmin.save()

        return resolve(newAdmin);
    } catch (err) {
        logger.error(`[AdminController][registerAdmin][${email}] Error: ${JSON.stringify(err)}`);
        reject({ status: 500, msg: 'Internal server error', err });
    }
});