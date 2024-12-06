import { Request, Router } from 'express';

const testRoutes = Router();

testRoutes.post('/', (req: Request, res) => {
    const ip = req.headers['x-forwarded-for'];
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ message: 'successful!', ip });
    console.log('ip: ', ip);
});

export default testRoutes;
