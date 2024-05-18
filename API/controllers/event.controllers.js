import { validationResult } from "express-validator";
import Event from "../models/event.js";
import User from "../models/users.js";

export const createEvent = async (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ errors: result.errors.map((item) => item.msg) });
  }
  try {
    const { title, description, startDate, endDate, location } = req.body;
    const { organizerId } = req.params;
    console.log(organizerId);
    if (!title || !description || !startDate || !endDate || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      startDate,
      endDate,
      location,
      organizerId,
    });

    await newEvent.save();

    res.status(201).json(newEvent); // Return the newly created event
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
export const getAllEvent = async (req, res) => {
  try {
    // Retrieve all events
    const events = await Event.find();

    const totalCount = await Event.countDocuments();

    res.status(200).json({ totalCount, events });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const updateEvent = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ errors: result.array().map((err) => err.msg) });
  }

  try {
    const { title, description, startDate, endDate, location } = req.body;
    const { organizerId } = req.params;

    const newEvent = await Event.findByIdAndUpdate(
      organizerId,
      { title, description, startDate, endDate, location },
      { new: true }
    );

    const count = newEvent.Interest.length;
    const userPromis = newEvent.Interest.map(async (userId) => {
      const user = await User.findById(userId);
      return user ? user.toObject() : null;
    });

    const userDetails = await Promise.all(userPromis);

    const filtreduserDetails = userDetails.filter((item) => item !== null);
    const data = {
      "Count of Intrested Users": count,
      ...newEvent._doc,
      Interest: filtreduserDetails,
    };
    res.status(200).json(data); // Corrected status code to 200
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { organizerId } = req.params;
    console.log(organizerId);

    // Correctly pass organizerId to findByIdAndDelete
    await Event.findByIdAndDelete(organizerId);

    res.status(200).json({ message: "Event Deleted" }); // Return the newly created event
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const createInterest = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ error: result.array().map((item) => item.msg) });
  }
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    console.log(eventId);
    const newIntrest = await Event.findById({ _id: eventId });

    if (!newIntrest) {
      return res
        .status(400)
        .json({ error: "eventId not present | invalid eventId" });
    }
    if (newIntrest.Interest.includes(userId)) {
      return res.status(400).json({ error: "User already shown interest" });
    }

    newIntrest.Interest.push(userId);
    await newIntrest.save(); // Make sure to await the save operation

    // Fetch user details for each ID in the Interest array
    const userDetailsPromises = newIntrest.Interest.map(
      async (interestUserId) => {
        const user = await User.findById(interestUserId);
        return user ? user.toObject() : null; // Convert to plain object if found
      }
    );

    const usersDetails = await Promise.all(userDetailsPromises);

    // Filter out nulls in case some users were not found
    const filteredUsersDetails = usersDetails.filter((user) => user !== null);

    // Corrected syntax for spreading and updating properties

    const data = { ...newIntrest._doc, Interest: filteredUsersDetails };
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// const usersQuery = { _id: { $in: newIntrest.Interest } };
// const users = await User.find(usersQuery);

export const getEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    // Retrieve all events
    const events = await Event.findById({ _id: eventId });
    const userPromies = events.Interest.map(async (userId) => {
      const user = await User.findById(userId);
      return user ? user.toObject() : null;
    });

    const userDetails = await Promise.all(userPromies);

    const FilterUserDetails = userDetails.filter((user) => user !== null);

    const data = { ...events._doc, Interest: FilterUserDetails };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
