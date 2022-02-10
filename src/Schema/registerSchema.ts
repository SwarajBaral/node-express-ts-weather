import { body } from "express-validator";

export const schema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Full name is required"),
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  body("email")
    .isEmail()
    .exists({ checkFalsy: true })
    .withMessage("Invalid Email Format"),
  body("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters long"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];
