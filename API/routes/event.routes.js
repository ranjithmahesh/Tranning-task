import express from "express";
import {
  createEvent,
  createInterest,
  deleteEvent,
  getAllEvent,
  getEvent,
  updateEvent,
} from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/create-event/:organizerId", createEvent);
router.post("/create-event/intrest/:eventId", createInterest);
router.put("/create-event/:organizerId", updateEvent);
router.delete("/create-event/:organizerId", deleteEvent);
router.get("/create-event", getAllEvent);
router.get("/create-event/:eventId", getEvent);

export default router;
