
const JWT = require('jsonwebtoken');
const User = require('../models/user');

function validateToken(cookieName){
   return async(req, res, next) =>{
    const authToken = req.cookies[cookieName];
    if(!authToken){
       return next();
       }
       try{
        const payload = JWT.verify(authToken, process.env.JWT_SECRET_KEY);
        const user = await User.findById(payload._id).select("-password");
        req.user = user;
        // console.log(user);
         }
        catch(err){
            console.log(err);
        }; 
            
        return next();
    }
}
module.exports = {validateToken};

