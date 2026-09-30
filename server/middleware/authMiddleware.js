import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists. Authorization denied.',
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token. Please log in again.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in to access this resource.',
    });
  }
};
