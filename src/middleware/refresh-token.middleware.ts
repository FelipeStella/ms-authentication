import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../models/errors';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeaders = req.headers['authorization']; 

        if(!authorizationHeaders){
            throw new ForbiddenError('Access denied');
        }
        
        const [ authorizationType, token ] = authorizationHeaders.split(' ');

        if(authorizationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Authentication type or Invalid Credentials');
        }

        const decoded : JwtPayload  = jwt_decode(token);

        if(!decoded.username || !decoded.sub){    
            throw new ForbiddenError('Invalid token');        
        }

        const user = {
            uuid: decoded.sub,
            username: decoded.username
        }

        req.user = user;

        next(); 

    } catch (error) {
        next(error);
    }
}