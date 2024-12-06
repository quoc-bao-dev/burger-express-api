import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { createResponse } from '../utils/response';

class AuthController {
    async register(req: Request, res: Response) {
        const { email, password, name, phone, address } = req.body;

        const payload = await AuthService.register({
            email,
            password,
            name,
            phone,
            address,
        });

        const response = createResponse({
            statusCode: 200,
            message: 'Register successfuly!',
            data: payload,
        });

        res.status(response.statusCode).json(response);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const payload = await AuthService.login(email, password);

        const response = createResponse({
            statusCode: 200,
            message: 'Login successfuly!',
            data: payload,
        });

        res.status(response.statusCode).json(response);
    }

    async me(req: Request, res: Response) {
        res.status(200).json({
            statusCode: 200,
            message: 'Successfuly!',
            data: ['req.user'],
        });
    }
}

export default new AuthController();
