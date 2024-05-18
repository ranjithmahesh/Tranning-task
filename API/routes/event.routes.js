import express from "express";
import {
  createEvent,
  createInterest,
  deleteEvent,
  getAllEvent,
  getEvent,
  updateEvent,
} from "../controllers/event.controllers.js";
import {
  CreateEventValidation,
  createInterestValidation,
  updateEventValidation,
} from "../utils/validation.mjs";

const router = express.Router();

router.post("/create-event/:organizerId", CreateEventValidation(), createEvent);
router.post(
  "/create-event/intrest/:eventId",
  createInterestValidation(),
  createInterest
);
router.put("/create-event/:organizerId", updateEventValidation(), updateEvent);
router.delete("/create-event/:organizerId", deleteEvent);
router.get("/create-event", getAllEvent);
router.get("/create-event/:eventId", getEvent);

export default router;
