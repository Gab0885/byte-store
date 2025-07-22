import type { NextFunction, Request, Response, CookieOptions } from "express";
import { createUser, verifyUser } from "../services/authService";
import { findByEmail } from "../services/userService";
import { generateToken } from "../utils/generateToken";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 6, // 6 horas
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExists = await findByEmail(req.body.email);

    if (userExists) {
      res.status(400).json({ message: "Email já em uso, tente outro email." });
      return;
    }

    const newUser = await createUser(req.body);
    const { passwordHash, ...safeNewUser } = newUser;

    const token = generateToken(
      safeNewUser.id,
      safeNewUser.name,
      safeNewUser.email
    );

    res.cookie("jwt", token, cookieOptions);

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso.", safeNewUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authResult = await verifyUser(req.body);
    if (!authResult.isValid || !authResult.user) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    const token = generateToken(
      authResult.user.id,
      authResult.user.name,
      authResult.user.email
    );

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({ message: "Login realizado com sucesso." });
  } catch (error) {
    next(error);
  }
};
