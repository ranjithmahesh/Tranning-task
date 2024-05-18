import express from "express";
import {
  LoginUse,
  createUse,
  deleteUse,
  getUse,
  updateUse,
} from "../controllers/user.controllers.js";
import {
  CreateUserValidation,
  updateUseUserValidation,
} from "../utils/validation.mjs";

const router = express.Router();

router.post("/create-user", CreateUserValidation(), createUse);
router.post("/create-user/login", LoginUse);
router.get("/create-user", getUse);
router.put("/create-user/:id", updateUseUserValidation(), updateUse);
router.delete("/create-user/:id", deleteUse);

export default router;
