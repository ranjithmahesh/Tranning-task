import { validationResult } from "express-validator";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUse = async (req, res) => {
  // Apply validation middleware
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // If there are validation errors, return them immediately
    return res.status(400).json({
      errors: result.errors.map((item) => item.msg),
    });
  }

  const { username, email, password } = req.body;
  const excriptedPassword = bcrypt.hashSync(password, 10);

  console.log(excriptedPassword, "excriptedPassword");
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password: excriptedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id.toString() }, process.env.secretKey, {
      expiresIn: "1hr",
    });

    res.status(200).json({ message: "User created", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user.");
  }
};

export const LoginUse = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
    }

    const decodePassword = bcrypt.compareSync(password, existingUser.password);

    if (!decodePassword) {
      res.status(400).json({ message: "User password worng" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.secretKey, {
      expiresIn: "1hr",
    });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
};

export const updateUse = async (req, res) => {
  const result = validationResult(req);

  // Simplified logging for production
  if (!result.isEmpty()) {
    console.log("Validation Errors:", result.array());
    return res.status(400).json({
      errors: result.array().map((err) => err.msg),
    });
  }

  const { username, email, password } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Updated", user });
  } catch (error) {
    console.error("Update Error:", error.stack);
    res
      .status(500)
      .send(
        "An error occurred while updating the user. Please try again later."
      );
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
