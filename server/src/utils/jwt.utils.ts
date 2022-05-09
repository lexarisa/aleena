import { sign, SignOptions } from 'jsonwebtoken';
import { TokenPayload } from './../interfaces/tokenPayload';
import * as fs from 'fs';
import * as path from 'path';

export const generateToken = () => {
    const payload: TokenPayload = {

        // issued at time, 60 seconds in the past to allow for clock drift
        iat: Math.round(Date.now() / 1000) - 60,

        // JWT expiration time (10 minute maximum)
        exp: Math.round(Date.now() / 1000) + (10 * 60),

        iss: "198267"
    };

    const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key.pem'), 'utf8');
    
    const signInOptions: SignOptions = {
        algorithm: 'RS256'
    };

    return sign(payload, privateKey, signInOptions);
};
