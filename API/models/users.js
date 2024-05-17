import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields can be added here, such as profile picture URL, bio, etc.
});
const User = mongoose.model("User", UserSchema);
export default User;
