import { Request, Response, NextFunction } from 'express';
import Cryptr from 'cryptr';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.dev.env') });

const cryptr = new Cryptr(`${process.env.ENC_SECRET}`)

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;

        if (!token) return res.status(403).send('You are not going that far 😏');

        const decoded = cryptr.decrypt(`${token}`);

        req.params.token = decoded;

        next();    
    } catch (error) {
        console.error(error);
        res.status(401);
    }
}

export const createToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;

        const encoded = cryptr.encrypt(`${token}`)
     
        req.params.token = encoded;

        next();
    } catch (error) {
        console.error(error);
        
        res.status(401);
    }
}