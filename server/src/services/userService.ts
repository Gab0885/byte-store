import { prisma } from "../config/database";
import type { User } from "../prisma/generated/prisma";
import type { UpdateUserInput } from "../schemas/user";

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}

export async function removeUserById(id: number): Promise<User | null> {
  return await prisma.user.delete({ where: { id } });
}

export async function updateUserById(id: number, user: UpdateUserInput) {
  return await prisma.user.update({ where: { id }, data: user });
}