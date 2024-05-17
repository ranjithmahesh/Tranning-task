import Interest from "../models/interests.js";
import User from "../models/users.js";

export const createUse = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User allready exist" });
    }

    const user = new User({ username, email, password });

    await user.save();

    res.status(200).json({ message: "User create", user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUse = async (req, res) => {
  const { username, email, password } = req.body;

  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, password },
      { new: true }
    );

    res.status(200).json({ message: "User Updates", user });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUse = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
};
export const getUse = async (req, res) => {
  try {
    const users = await User.find();
    const totalCount = await User.countDocuments();

    res.status(200).json({ message: "all User ", totalCount, users });
  } catch (error) {
    console.log(error);
  }
};
