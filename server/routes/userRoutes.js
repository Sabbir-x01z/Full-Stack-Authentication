import express from 'express';
import { userAuth } from '../middleWare/middleWare.js';
import { userDara } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, userDara);

export default userRouter;