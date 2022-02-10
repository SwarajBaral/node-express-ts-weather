import { Request } from "express";
export interface UserAuth extends Request {
  user: object; // or any other type
}
