const mongoose = require("mongoose")
const jwtToken = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        type:String,
        required:true,
        select:false
    },
    conform_password:{
        type:String,
        required:true,
        select:false
    }
},{
    timestamps:true
})
// Use a standard function instead of an arrow function
connect.pre('save', async function(next) {
    // Inside this function, 'this' will refer to the Mongoose document being saved
    if (!this.isModified('password')) { 
        return next();
    }
    try {
        // Check if this.password is a string
        if (typeof this.password !== 'string') {
            throw new Error("Password must be a string.");
        }

        // Hash the password with bcrypt
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error); // Pass any errors to the next middleware or callback
    }
}

);

connect.methods= { 
    jwtToken(){
        return jwtToken.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}
module.exports = mongoose.model("user",connect);