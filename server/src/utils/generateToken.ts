import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no ambiente.");
}

export const getJwtSecret = (): jwt.Secret => {
  return JWT_SECRET;
};

export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, {
    expiresIn: '12h' // Token expira em 12 horas
  });
};