import type { Response, Request, ErrorRequestHandler, NextFunction } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Erro interno:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
};
