import express, { Request, Response } from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


// Middlewares
app.use(cors());
app.use(express.json());


// Configuration
dotenv.config();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req: Request, res: Response) => {
    return res.json({ msg: "Welcome to City Super Market API Services" });
});

// Load UI
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server
app.listen(PORT, () => console.log(`[server]: Server running @${PORT}`));