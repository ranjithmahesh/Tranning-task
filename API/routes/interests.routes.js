import express from "express";
import {
  creatIntrest,
  getIntrestedUsers,
} from "../controllers/intrest.controllers.js";

const router = express.Router();

router.post("/add-interest/:eventId", creatIntrest);
router.get("/add-interest/:eventId", getIntrestedUsers);

export default router;
