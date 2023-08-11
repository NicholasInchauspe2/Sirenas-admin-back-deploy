import { Request, Response, NextFunction } from "express";
import { Request as ExpressRequest } from 'express';
import { validateToken } from "../config/token";

// Interfaz extendida de Request
export interface UserRequest extends ExpressRequest {
  user?: {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
  };
} // Aquí puedes establecer el tipo correcto de la propiedad user

const validateUser = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token, " =======> AQUI EL TOKEN");

  if (token) {
    const payload = validateToken(token);

    req.user = payload;

    if (payload) return next();

    res.sendStatus(401);
  }
};

export default validateUser;
