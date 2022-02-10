import { body } from "express-validator";

export const schema = [
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  body("email")
    .isEmail()
    .exists({ checkFalsy: true })
    .withMessage("Invalid Email Format"),
  body("pass")
    .exists({ checkFalsy: true })
    .withMessage("Password is required to login"),
];
