const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/auth');


const registerUser = async(req, res) =>{
    const {fullName, email, password } = req.body;
    
    const user = await User.findOne({email});
    if(user)
        res.render("register",{message:"Account already exist"});
    else{
     await User.create({
        fullName,
        email,
        password,
        profileImage:req.file.path
       });

     return res.redirect("/");
    }
}

const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) throw new Error("User not Found");

        const userPassword = user.password;
        const matchPassword = await bcrypt.compare(password, userPassword);
        if(!matchPassword)
            throw new Error("Incorrect Password");
    
        const token = generateToken(user);
        // console.log(token);
        res.cookie("token", token);
        return res.redirect("/");
}


const logoutUser = (req, res) =>{
    res.clearCookie("token");
    res.redirect("/");
}


module.exports = {registerUser, loginUser, logoutUser};