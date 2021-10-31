import express from 'express';
import { bearerAuthenticationMiddleware, errorHandler } from './middleware';
import { userRoute, authorizationRoute } from './routes';

const host = 'http://localhost';
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorizationRoute);
app.use(bearerAuthenticationMiddleware);
app.use(userRoute);


app.use(errorHandler);

app.listen(3000, () => console.log(`Server is running in ${host}:${port}`));