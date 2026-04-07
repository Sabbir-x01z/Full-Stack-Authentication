import nodemailer from 'nodemailer';
import userModel from '../models/usermodel.js';
import transporter from '../config/nodemailer.js';
import jwt from 'jsonwebtoken';

export async function otp (req, res){

    const token = req.cookies.cookie;
    if(!token){
        return res.json({ success: false, message: "Sign in again" });
    }


    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;


        const user = await userModel.findById(userId);

        if(user.isVarify){
            return res.json({success: false, message: 'account already varify'});
        }

        const Otp = String(Math.floor(100000 + Math.random() * 900000));

        user.varifyOtp = Otp;
        user.otpExpires = Date.now() + 60 * 1000;

        user.save();

        try {
            let info = await transporter.sendMail({
                from: '"Sabbir Dev" <noreply@example.com>',
                to: user.email,
                subject: "Email verification otp",
                text: Otp,
            });

            console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        }catch(error){
            return res.json({success: false, message: error.message});
        }


        return res.json({success: true, message: 'otp send on email'});

        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// varify otp


export async function varifyOtp(req, res) {


    const token = req.cookies.cookie;

    const { Otp } = req.body;    

    if (!token || !Otp) {
        return res.json({ success: false, message: "Sign in again" });
    }

    try {
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;


        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (String(user.varifyOtp) !== String(Otp)) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        
        if (user.otpExpires < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        user.isVarify = true;
        user.varifyOtp = "";
        user.otpExpires = 0;

        await user.save();

        return res.json({ success: true, message: "Email verified successfully!" });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}


export async function passReset(req, res) {
    
    const {email} = req.body;
    if(!email){
        return res.json({success: false, message: "email required"});
    }

    try {
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'user not found'});
        }

        const Otp = String(Math.floor(100000 + Math.random() * 900000));

        user.varifyOtp = Otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        await user.save();

        try {
            let info = await transporter.sendMail({
                from: '"Sabbir Dev" <noreply@example.com>',
                to: user.email,
                subject: "Password reset otp",
                text: Otp,
            });
            console.log('preview URL:', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            return res.json({success: false, message: error.message});
        }
        res.cookie("resetEmail", user.email, {
            httpOnly: true,
            maxAge: 60 * 1000,
            secure: true, 
            sameSite: "none",
        });



        return res.json({success: true, message: 'otp sent on email'});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


export async function passResetOtp (req, res){

    const email = req.cookies.resetEmail;
    const {Otp} = req.body;

    if(!email || !Otp){
        return res.json({success: false, message: 'something went wrong!'});
    }

    try {
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'try again'});
        }

        if(String(user.varifyOtp) !== String(Otp)){
            return res.json({success: false, message: 'envalid otp'});
        }
        if(user.otpExpires < Date.now()){
            return res.json({success: false, message: 'otp expired'});
        }

        user.varifyOtp = "";
        user.otpExpires = 0;
        await user.save();

        return res.json({success: true, message: 'reset your password'});


    } catch (error) {
        return res.json({success: false, message: error.messge})
    }
}