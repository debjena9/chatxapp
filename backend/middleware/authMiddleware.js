const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      // Call next middleware
      return next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  // If no token is found
  res.status(401);
  throw new Error('Not authorized');
});

module.exports = { protect };
