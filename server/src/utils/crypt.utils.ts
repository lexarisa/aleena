import { Request, Response, NextFunction } from 'express';
import Cryptr from 'cryptr';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.dev.env') });

const cryptr = new Cryptr(`${process.env.ENC_SECRET}`)

export const createToken = async (token: number) => {
    try {
        const encoded = await cryptr.encrypt(`${token}`)
        
        console.log('encoded', encoded);

        return encoded
    } catch (error) {
        console.error(error);
    }   
}