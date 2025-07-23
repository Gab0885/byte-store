import z from "zod";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "O nome deve ter ao menos 2 caracteres")
      .optional(),

    email: z.string().trim().email("Formato de email inválido").optional(),

    passwordHash: z
      .string()
      .min(6, "A senha deve ter ao menos 6 caracteres")
      .optional(),
  })
  .strict();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
