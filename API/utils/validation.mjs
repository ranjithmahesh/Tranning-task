import { body, param } from "express-validator";

export const CreateUserValidation = () => {
  return [
    body("username")
      .isLength({ min: 5, max: 32 })
      .withMessage(
        "UserName must be at least 5 characters and a maximum of 32 characters"
      )
      .notEmpty()
      .withMessage("UserName cannot be empty")
      .isString()
      .withMessage("UserName must be a string"),

    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email cannot be empty"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character")
      .notEmpty()
      .withMessage("Password cannot be empty"),
  ];
};

export const updateUseUserValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("id cannot be empty")
      .isString()
      .withMessage("id must be a string"),

    body("username")
      .isLength({ min: 5, max: 32 })
      .withMessage(
        "UserName must be at least 5 characters and a maximum of 32 characters"
      )
      .notEmpty()
      .withMessage("UserName cannot be empty")
      .isString()
      .withMessage("UserName must be a string"),

    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .notEmpty()
      .withMessage("Email cannot be empty"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character")
      .notEmpty()
      .withMessage("Password cannot be empty"),
  ];
};
