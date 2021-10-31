import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { isJwtExpired } from 'jwt-check-expiration';
import { ForbiddenError, UnauthorizedError } from '../models/errors';
import 'dotenv/config';

export const bearerAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeaders = req.headers['authorization']; 

        if(!authorizationHeaders){
            throw new ForbiddenError('Access denied');
        }
        
        const [ authorizationType, token ] = authorizationHeaders.split(' ');

        if(authorizationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Authentication type or Invalid Credentials');
        }

        if(isJwtExpired(token)) {
            throw new UnauthorizedError('Expired token');
        }

        if(!process.env.MY_SECRET_KEY){
            throw new UnauthorizedError('Secret key not found');
        }

        try {
            const tokenPayload = JWT.verify(token, process.env.MY_SECRET_KEY);
  
            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){    
                throw new ForbiddenError('Invalid token');        
            }
    
            const user = { 
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            }
    
            req.user = user;
            next();
            
        } catch (error) {
            throw new ForbiddenError('Invalid token');
        }

    } catch (error) {
        next(error);
    }
}