import { Request, Router } from 'express';

const testRoutes = Router();

testRoutes.post('/', (req: Request, res) => {
    const ip = req.headers['x-forwarded-for'];
    res.json({ message: 'successful!', ip });
    console.log('ip: ', ip);
});

export default testRoutes;
