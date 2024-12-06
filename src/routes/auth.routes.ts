import { Router } from 'express';
import authenController from '../controllers/auth.controller';
import wrapAsync from '../middlewares/requestHandler';
import authenMiddleware from '../middlewares/authenMiddleware';

const authenRoutes = Router();

authenRoutes.post('/register', wrapAsync(authenController.register));
authenRoutes.post('/login', wrapAsync(authenController.login));
authenRoutes.get('/me', authenMiddleware, wrapAsync(authenController.me));

export default authenRoutes;
