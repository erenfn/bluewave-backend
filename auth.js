const jwt = require('jsonwebtoken');
const basicAuth = require('express-basic-auth');
const User  = require('./models/User');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      req.user = decoded;
      next();
    }
  });
}

function generateToken(user) {
    return jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  const auth = basicAuth({
    authorizer: async (username, password) => {

        const user = await User.findOne({ where: { name: username } });
        if (!user) return false; // User not found

        return await bcrypt.compare(password, user.password);
    },
    unauthorizedResponse: { 
        message: 'Unauthorized'
    }
  });
  
  module.exports = { verifyToken, generateToken, auth };