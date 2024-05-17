import Interest from "../models/interests.js";

export const creatIntrest = async (req, res) => {
  const { userId } = req.body;
  const { eventId } = req.params;

  if (!userId || !eventId) {
    return res
      .status(400)
      .json({ error: "Both userId and eventId are required" });
  }

  const existingIntrest = await Interest.findOne({ eventId, userId });

  if (existingIntrest) {
    return res.status(409).json({ error: "Interest already exists" });
  }

  const newInterest = new Interest({
    eventId,
    userId,
  });

  await newInterest.save();

  res.status(201).json(newInterest);
};

export const getIntrestedUsers = async (req, res) => {
  const { eventId } = req.params;

  const existingIntrest = await Interest.find();
  res.status(200).json(existingIntrest);
};
