import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserAuth } from "../Interface/authInterface";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) res.status(401).json({ err: "Invalid Token" });

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err, user) => {
      if (err) res.status(403).send({ err });
      res.locals.user = user;
      next();
    }
  );
};
