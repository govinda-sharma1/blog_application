const JWT = require('jsonwebtoken');

const generateToken = (user)=>{
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
      };
      const token = JWT.sign(payload, process.env.JWT_SECRET_KEY);
      return token;
}


module.exports = {generateToken};