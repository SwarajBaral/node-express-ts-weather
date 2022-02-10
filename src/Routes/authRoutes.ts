import express, { NextFunction, Request, Response } from "express";
import authController from "../Controllers/authController";
import { validateRequest as validateAuthRequest } from "../Middlewares/validateRequest";
import { validateSignUpRequest } from "../Middlewares/validateSignUpRequest";
import { schema as authSchema } from "../Schema/authSchema";
import { schema as registerSchema } from "../Schema/registerSchema";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  registerSchema,
  validateSignUpRequest,
  authController.signUp
);

authRouter.post(
  "/login",
  authSchema,
  validateAuthRequest,
  authController.login
);

authRouter.delete("/logout", authController.logout);

export default authRouter;
