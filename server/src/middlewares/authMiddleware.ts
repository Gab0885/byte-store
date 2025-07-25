import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/generateToken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret()) as {
        userId: number;
        name: string;
        email: string;
      };

      // Validação adicional de tipos
      if (typeof decoded.userId !== 'number' || typeof decoded.name !== 'string' || typeof decoded.email !== "string") {
        throw new Error('Token invalido!');
      }

      res.locals.user = {
        id: decoded.userId,
        name: decoded.name
      };
    } catch (err) {
      console.error('Erro de autenticação:', err);
      res.clearCookie("jwt");
    }
  }
  next();
};