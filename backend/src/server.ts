import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import db from './config/db';
import logger from './utils/logger';

// @types
import { IRequest, IResponse } from 'src/interfaces/vendor';

// routes
import { admin } from './routes';


// Middlewares
app.use(cors());
app.use(express.json());


// Configuration
dotenv.config();
db();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req: IRequest, res: IResponse): IResponse => {
    return res.json({ msg: "Welcome to City Super Market API Services" });
});
app.use('/api/admin', admin);

// Load UI
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req: IRequest, res: IResponse) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server
app.listen(PORT, () => logger.info(`[server] Server running @${PORT}`));