const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
              if(err) {
                reject(err)
              }
        bcrypt.hash(password, salt, (err, hash) => {
              if(err) {
                reject(err)
              }
              resolve(hash)
            })
      })
  })
}
const comparePassword = (password, hashed) => {
      return bcrypt.compare(password, hashed)
}

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken
};