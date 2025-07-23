import type { NextFunction, Request, Response } from "express";
import {
  getAllUsers,
  getUserByEmail,
  removeUserById,
  getUserById,
  updateUserById,
} from "../services/userService";

export const findAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();

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
    const user = await getUserById(id);
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
    const user = await getUserByEmail(email);
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
    const deletedUser = await removeUserById(id);
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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  try {
    const updatedUser = await updateUserById(id, req.body);
    const { passwordHash, ...safeUpdatedUser } = updatedUser;
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso.", safeUpdatedUser });
  } catch (error) {
    next(error);
  }
};
