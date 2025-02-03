//const User = require('../models/user');
const User = require ('../models/user');
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/auth');


const test = (req, res) => {
  res.json('test is working')
}

//Register Endpoint
const registerUser = async (req,res) => {

  try{
    const{name, email, password} = req.body;
    //check if name was entered
    if(!name){
      return res.json({
          error : 'name is required'
      })
    };

    //check if password is good
    if(!password || password.length < 6 ){
      return res.json({
          error : 'password is required and should be at least 6 characters long' 
      })
    };

    //check email
    const exist = await User.findOne({email});

    if(exist){
      return res.json({
        error: 'email is taken already'
      })
    }

    const hashedPassword = await hashPassword(password)
//create user in database
    const user = await User.create({
      name,email,
      password: hashedPassword,
    })

    return res.json(user)

  }catch(error){
    console.log(error)
  }
}

//Login EndPoint
const loginUser = async (req,res) => {

  try{
    const{ email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email})
    if(!user){
      return res.json({
        error: 'no user found'
    })
  }

    //check if password match
    const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).json({ error: 'Incorrect password' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });

        res.json({ accessToken, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  

// Refresh Token Endpoint
const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ error: 'Refresh token not found' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
  });
};

// Logout Endpoint (Clear Refresh Token)
const logoutUser = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

const getProfile = (req,res) => {

  const {token} = req.cookies
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {} , (err, user) => {
      if(err) throw err;
      res.json(user)
  })
}else{
  res.json(null)
}

}

module.exports =  {
test,
registerUser,
loginUser,
getProfile,
refreshAccessToken,
logoutUser
}