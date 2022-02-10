import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import authService from "../Services/authService";

class authController {
  async login(req: Request, res: Response): Promise<void> {
    // TODO: Authenticate user first
    try {
      const email: string = req.body.email;
      const pass: string = req.body.pass;
      const authToken = await authService.login({
        email: email,
        password: pass,
      });
      if ((authToken as any).success === false) {
        res.status(401).json(authToken);
      }
      res.status(200).json(authToken);
    } catch (error) {
      throw error;
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { name, username, email, role, password } = req.body;
      const status = await authService.signUp({
        name,
        username,
        email,
        role,
        password,
      });
      if (status.success === false) {
        if ((status as any).error.code === "ER_DUP_ENTRY") {
          res.status(409).json({
            succes: false,
            msg: "User with matching username or email already exists",
          });
        }
        res.status(400).json(status);
      }
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken;
      if (refreshToken === null || undefined) {
        res.status(401).json({
          success: false,
          msg: "Could not find refresh token in the body",
        });
      }
      if (!authService.refreshTokens.includes(refreshToken)) {
        res.status(403).json({ success: false, msg: "Invalid Token" });
      }
      const status = authService.logout(refreshToken);
      res.status(204).json(status);
    } catch (error) {
      res.status(500).json({ err: error });
    }
  }
}

export default new authController();
