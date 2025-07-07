import z from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("O nome é obrigatório")
      .min(2, "O nome deve ter ao menos 2 caracteres"),

    email: z
      .string()
      .trim()
      .nonempty("O email é obrigatório")
      .email("Formato de email inválido"),

    passwordHash: z.string().min(5, "A senha deve ter ao menos 5 caracteres"),
  })
  .strict();

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

export type createUserInput = z.infer<typeof createUserSchema>;

export type updateUserInput = z.infer<typeof updateUserSchema>;
