import express from "express";
import {
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
router.get("/create-user", getUse);
router.put("/create-user/:id", updateUseUserValidation(), updateUse);
router.delete("/create-user/:id", deleteUse);

export default router;
