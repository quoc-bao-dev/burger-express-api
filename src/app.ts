import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Routes from './routes';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';
import { config } from './config/config';

const app = express();

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
});

// app.use(express.static('public'));
app.use(
    cors({
        origin: '*',
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', Routes);
app.use(errorHandler);

export default app;
