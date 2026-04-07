import userModel from "../models/usermodel.js";

export async function userDara(req, res) {
    
    try {
        

        const user = await userModel.findById(req.userId);
        if(!user){
            return res.json({success: false, message: 'user not  found!'})
        }

        res.json({
            success: true,
            User: {
                name: user.name,
                email: user.email,
                isVarify: user.isVarify
            }
        })

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}