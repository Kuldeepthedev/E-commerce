const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter name"],
        maxlenght:[30,"Name can't excced 30 char"],
        minlenght:[4,"Name should have more than 4 char"]
    },
    email:{
        type:String,
        required: [true,"Please enter name"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter name"],
        minlenght:[8,"Password should be greater than 8 char"],
        select: false

    },
    OTP: {type:String},
    avatar:  {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
module.exports = mongoose.model("user",userSchema)