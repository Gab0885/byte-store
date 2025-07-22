import { prisma } from "../config/database";
import type { User } from "../prisma/generated/prisma";
import type { UpdateUserInput } from "../schemas/user";

export async function findAll(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function findById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } });
}

export async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}

export async function deleteById(id: number): Promise<User | null> {
  return await prisma.user.delete({ where: { id } });
}

export async function updateById(id: number, user: UpdateUserInput) {
  return await prisma.user.update({ where: { id }, data: user });
}