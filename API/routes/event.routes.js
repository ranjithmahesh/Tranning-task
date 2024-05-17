import express from "express";
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/create-event/:organizerId", createEvent);
router.put("/create-event/:organizerId", updateEvent);
router.delete("/create-event/:organizerId", deleteEvent);
router.get("/create-event", getEvent);

export default router;
