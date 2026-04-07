import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectMongoDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoutes.js';

const allowedOrigins = [
    'http://localhost:5173',
    'https://your-frontend.vercel.app' // তোমার Vercel frontend URL দাও
];

const app = express();
const port = process.env.PORT || 8080;

// DB connect
connectMongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hi! from server!');
});

app.use('/api/auth', authRouter);
app.use('/user', userRouter);

// Start server
app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
});