import Interest from "../models/interests.js";

export const createInterest = async (req, res) => {
  const { userId } = req.body;
  const { eventId } = req.params;
  console.log(eventId);

  try {
    let existingEvent = await Interest.findOne({ eventId });
    console.log(existingEvent);
    // Check if the event exists and userId is not already present
    if (!existingEvent || existingEvent.userId.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already interested or event not found." });
    }

    // Add the userId to the userId array
    existingEvent.userId.push(userId);

    // Save the modified document
    await existingEvent.save();

    res.status(200).json({
      message: "User successfully added to the interest list.",
      userId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while adding the user to the interest list.");
  }
};

export const getallIntrestedUsers = async (req, res) => {
  const existingIntrest = await Interest.find();
  res.status(200).json(existingIntrest);
};
export const getIntrestedUsers = async (req, res) => {
  const { eventId } = req.params;

  const existingIntrest = await Interest.find({ eventId });
  res.status(200).json(existingIntrest);
};
