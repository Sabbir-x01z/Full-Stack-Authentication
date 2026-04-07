import { configDotenv } from 'dotenv';
configDotenv();

import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import connectMongoDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoutes.js';


const allowedOrigin = ['http://localhost:5173'];
const app = express();
const port = process.env.PORT || 8080;
connectMongoDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigin, credentials: true}));

app.get('/', (req, res) => {
    res.send('Hi! from server!');
})

app.use('/api/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`server started on PORT: ${port}`);
});