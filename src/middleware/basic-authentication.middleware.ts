import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../models/errors';
import userRepository from '../repository/user.repository';

export const basicAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeaders = req.headers['authorization']; 

        if(!authorizationHeaders){
            throw new ForbiddenError('Access denied');
        }
        
        const [ authorizationType, token ] = authorizationHeaders.split(' ');

        if(authorizationType !== 'Basic' || !token) {
            throw new ForbiddenError('Authentication type or Invalid Credentials');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [ username, password ] = tokenContent.split(':');

        if(!username || !password){
            throw new ForbiddenError('Credentials not found');
        }

        const user = await userRepository.findUsernameAndPassword(username, password);
  
        if(!user) {
            throw new ForbiddenError('Invalid username and password');
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}