import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export async function userAuth (req, res, next){
    const token = req.cookies.cookie;


    if(!token){
        return res.json({success: false, message: 'login again!'});
    }

    try {

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        
        if(decode.id){
            req.userId = decode.id;
        }else{
            return res.json({success: false, message: 'id not found'});
        }

        next();

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}