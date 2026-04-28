const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'Invalid token or user not active' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      error: 'Access denied',
      message: 'Invalid token' 
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          error: 'Access denied',
          message: 'Admin access required' 
        });
      }
      next();
    });
  } catch (error) {
    res.status(403).json({ 
      error: 'Access denied',
      message: 'Admin access required' 
    });
  }
};

module.exports = { auth, adminAuth };
