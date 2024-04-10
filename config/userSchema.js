const mongoose = require("mongoose")
const jwtToken = require("jsonwebtoken")

const connect = new  mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        maxLength: 50
    }
    ,
    email:{
        type:String,
        required:[true,"email is require "],
        lowercase:true,
        unique:[true,/*add error here-->*/"this email is already present" ]
    },
    mobile_no:{
        type:Number,
        required:[true,"number is required"]
    },
    password:{
        type:Number,
        required:true,
        select:false
    },
    conform_password:{
        type:Number,
        required:true,
        select:false
    }
},{
    timestamps:true
})

connect.methods= {
    jwtToken(){
        return jwtToken.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24'}
        )
    }
}
module.exports = mongoose.model("user",connect);