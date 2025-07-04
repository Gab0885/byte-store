import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      res.status(400).json({ errors });
      return;
    }
    // substitui body por dados validados e tipados
    req.body = result.data;
    next();
  };
}
