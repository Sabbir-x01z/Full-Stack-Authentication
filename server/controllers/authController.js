import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import nodemailer from 'nodemailer';


export async function register (req, res) {
    
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: "missing details"})
    }

    try {

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: 'user already exist'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('cookie', token); 

        //
        try {
        let info = await transporter.sendMail({
            from: '"Sabbir Dev" <noreply@example.com>',
            to: user.email,
            subject: "welcome",
            text: "welcome to our saas",
        });

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));


        } catch (error) {
            console.log(error)
        }

        return res.json({success: true});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export async function login(req, res) {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'some error occured!'})
    }

    try {
       const user = await userModel.findOne({email}) 

       if(!user){
        return res.json({success: false, message: 'user not found!'})
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return res.json({success: false, message: 'invalid password'});
       }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('cookie', token, {
            httpOnly: true,
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: true, 
            sameSite: "none",
        });

        return res.json({success: true});

    } catch (error) {
        return res.json({success: false, messase: error.message})
    }
}


export async function logOut(req, res) {

    try {
        
        res.clearCookie('cookie');

        return res.json({success: true, message: 'logged out'});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}