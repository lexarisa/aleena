import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;

        if (!token) return res.status(403).send('You are not going that far 😏');

        const decoded = jwt.verify(token);
        
    } catch (error) {
        console.error(error);
        res.status(401);
    }
}

export const createToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;

        const encToken = 
        const hashedId = await bcrypt.hash(token, 10);
        req.params.token = hashedId;
    } catch (error) {
        
    }
}