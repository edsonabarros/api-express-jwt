import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token necessário" });
  }

  const [, token] = authHeader.split(" ");

  try {
    await jwt.verify(token, "PbPnyUgQkdGWUS1ufd3TMsHKmkxBXVvX9e8DD2mqUAv");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
