import Event from "../models/event.js";

export const createEvent = async (req, res) => {
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
export const getEvent = async (req, res) => {
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
  try {
    const { title, description, startDate, endDate, location } = req.body;
    const { organizerId } = req.params;
    console.log(organizerId);

    const newEvent = await Event.findByIdAndUpdate(
      { _id: organizerId },
      {
        title,
        description,
        startDate,
        endDate,
        location,
      },
      { new: true }
    );

    res.status(201).json(newEvent); // Return the newly created event
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
