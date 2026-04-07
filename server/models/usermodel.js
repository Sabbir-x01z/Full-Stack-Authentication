import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    varifyOtp:{
        type: String,
        default: ''
    },
    otpExpires:{
        type: Number,
        default: 0
    },
    isVarify:{
        type:Boolean,
        default: false
    },

})

const userModel = mongoose.model('user', userSchema);

export default userModel;