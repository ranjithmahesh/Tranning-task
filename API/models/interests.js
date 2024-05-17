import mongoose from "mongoose";
const InterestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Additional fields can be added here, such as timestamp of interest expression, etc.
});

const Interest = mongoose.model("Interest", InterestSchema);
export default Interest;
