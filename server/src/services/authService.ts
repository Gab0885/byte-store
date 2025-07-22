import { prisma } from "../config/database";
import type { CreateUserInput, LoginInput } from "../schemas/auth";
import { comparePassword, hashPassword } from "../utils/hash";

type AuthenticatedUser = {
  isValid: boolean;
  user?: { id: number; name: string; email: string };
};

export async function createUser(user: CreateUserInput) {
  const passwordHash = await hashPassword(user.password);

  return await prisma.user.create({
    data: { email: user.email, name: user.name, passwordHash }
  });
}

export async function verifyUser(
  userInfos: LoginInput
): Promise<AuthenticatedUser> {
  const user = await prisma.user.findUnique({
    where: { email: userInfos.email },
  });

  if (!user) return { isValid: false };

  const isValid = await comparePassword(userInfos.password, user.passwordHash);

  if (!isValid) return { isValid: false };

  const { id, name, email } = user;

  return {
    isValid: true,
    user: { id, name, email },
  };
}
