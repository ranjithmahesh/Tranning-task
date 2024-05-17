import express from "express";
import {
  createUse,
  deleteUse,
  updateUse,
  getUse,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/create-user", createUse);
router.get("/create-user", getUse);
router.put("/create-user/:id", updateUse);
router.delete("/create-user/:id", deleteUse);

export default router;
