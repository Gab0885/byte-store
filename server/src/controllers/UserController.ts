import type { NextFunction, Request, Response, CookieOptions } from "express";
import {
  findAll,
  findByEmail,
  createNew,
  deleteById,
  findById,
  updateById,
} from "../services/userService";
import { generateToken } from "../utils/generateToken";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 6, // 6 horas
};

export const findAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAll();

    const safeUsers = users.map(({ passwordHash, ...safeUser }) => safeUser);
    res.status(200).json(safeUsers);
  } catch (error) {
    next(error);
  }
};

export const findUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ message: "ID Inválido." });
    return;
  }

  try {
    const user = await findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const { passwordHash, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query as { email?: string };
  if (!email || !String(email)) {
    res.status(400).json("Email inválido.");
    return;
  }

  try {
    const user = await findByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const { passwordHash, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ meesage: "ID inválido" });
    return;
  }

  try {
    const deletedUser = await deleteById(id);
    if (!deletedUser) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const { passwordHash, ...safeDeletedUser } = deletedUser;
    res
      .status(200)
      .json({ message: "Usuário deletado com sucesso.", safeDeletedUser });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExists = await findByEmail(req.body.email);

    if (userExists) {
      res
        .status(400)
        .json({ message: "Email já em uso, tente outro email." });
      return;
    }

    const newUser = await createNew(req.body);
    const { passwordHash, ...safeNewUser } = newUser;

    const token = generateToken(safeNewUser.id, safeNewUser.name, safeNewUser.email)
    
    res.cookie("jwt", token, cookieOptions)

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso.", safeNewUser });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  try {
    const updatedUser = await updateById(id, req.body);
    const { passwordHash, ...safeUpdatedUser } = updatedUser;
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso.", safeUpdatedUser });
  } catch (error) {
    next(error);
  }
};
