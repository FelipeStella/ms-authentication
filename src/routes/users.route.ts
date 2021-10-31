import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repository/user.repository';

export const userRoute = Router();

userRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAll();
    res.status(StatusCodes.OK).json(users);
});

userRoute.get('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid)
        res.status(StatusCodes.OK).send(user);
    } catch(error){
        next(error);
    }
});

userRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;    
    const uuid = await userRepository.insert(newUser);
    res.status(StatusCodes.CREATED).json(uuid);
});

userRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const userModified = req.body;

    userModified.uuid = uuid;

    await userRepository.update(userModified);

    res.sendStatus(StatusCodes.OK);
});

userRoute.delete('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
});