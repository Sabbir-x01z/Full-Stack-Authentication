import express from 'express';
import { login, logOut, register } from '../controllers/authController.js';
import { otp, passReset, passResetOtp, varifyOtp } from '../controllers/otpController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logOut);
authRouter.post('/send-otp', otp);
authRouter.post('/verify-account', varifyOtp);
authRouter.post('/password-reset', passReset);
authRouter.post('/password-otp', passResetOtp);


export default authRouter;