const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
      },
    email:{
        type:String,
        required:true,
        unique:true
     },
    password:{
        type:String,
        required:true,
      },
    profileImage:{
        type:String,
        default:"public/image/avatar-image.png"
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER"
    }  
}, {timestamps:true});


userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password"))
        return;
    
        const salt = await bcrypt.genSalt();
        const hassedPassword = await bcrypt.hash(user.password, salt);
        this.password = hassedPassword;
        next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;