import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'comiccraft_super_secret_jwt_key_2026_xyz987';
const JWT_EXPIRES_IN = '30d';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
