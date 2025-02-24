// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ success: false, message: 'Access token expired' });
      }
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
