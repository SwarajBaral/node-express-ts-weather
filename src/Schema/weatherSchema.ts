import { body } from "express-validator";

export const schema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Location name is required"),
  body("temp")
    .exists({ checkFalsy: true })
    .withMessage("Temp is required")
    .isFloat()
    .withMessage("Temp must be float or int"),
];
