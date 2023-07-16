import nodemailer, { TransportOptions } from 'nodemailer';
import logger from './logger';

const mailOptions = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
} as TransportOptions;

const transporter = nodemailer.createTransport(mailOptions);

const sendEmail = (mailParams: {to: string, subject: string, html: string}) => new Promise((resolve, reject) => {
    transporter.sendMail(
        {
            from: process.env.EMAIL_USER,
            text: mailParams.html,
            ...mailParams,
        }, (err, info) => {
            if (err) {
                logger.error(`[utils][sendEmail] Error Sending E-Mail:`);
                logger.error(err);
                reject({ msg: 'Internal server error', err: {}, status: 500 });
            }

            logger.info(`[utils][sendEmail] E-Mail sent:`);
            logger.info(info);
            resolve(true);
        }
    );
});

export default sendEmail;