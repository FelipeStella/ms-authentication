import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DatabaseError, ForbiddenError, UnauthorizedError } from '../models/errors';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
    } 
    else if (error instanceof ForbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN)
    }
    else if (error instanceof UnauthorizedError) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}