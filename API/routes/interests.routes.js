import express from "express";
import {
  createInterest,
  getIntrestedUsers,
  getallIntrestedUsers
} from "../controllers/intrest.controllers.js";

const router = express.Router();

router.post("/add-interest/:eventId", createInterest);
router.get("/add-interest", getallIntrestedUsers);
router.get("/add-interest/:eventId", getIntrestedUsers);

export default router;
