import 'dotenv/config';
import { Router, Request, Response, NextFunction } from 'express';
import JWT, { Secret, SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { basicAuthenticationMiddleware, bearerAuthenticationMiddleware, refreshTokenMiddleware } from '../middleware';
import { ForbiddenError, UnauthorizedError } from '../models/errors';

export const authorizationRoute = Router()

authorizationRoute.post('/token/validate', bearerAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

authorizationRoute.post('/token/refresh', refreshTokenMiddleware, (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.user;

        if(!user){
            throw new ForbiddenError('Uninformed user');
        }

        if(!process.env.MY_SECRET_KEY){
            throw new UnauthorizedError('Secret key not found');
        }

        const payload = { username: user.username };
        const secretOrPrivateKey: Secret = process.env.MY_SECRET_KEY;
        const options: SignOptions = { subject: user.uuid, expiresIn: '15m' };

        const jwt = JWT.sign(payload, secretOrPrivateKey, options);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch(error) {
        next(error)
    };
})

authorizationRoute.post('/token', basicAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.user;

        if(!user){
            throw new ForbiddenError('Uninformed user');
        }

        if(!process.env.MY_SECRET_KEY){
            throw new UnauthorizedError('Secret key not found');
        }

        const payload = { username: user.username };
        const secretOrPrivateKey: Secret = process.env.MY_SECRET_KEY;
        const options: SignOptions = { subject: user.uuid, expiresIn: '15m' };

        const jwt = JWT.sign(payload, secretOrPrivateKey, options);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch(error) {
        next(error)
    };

});