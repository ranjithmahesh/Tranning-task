import mongoose from "mongoose";
const InterestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: Array,
  },
  // Additional fields can be added here, such as timestamp of interest expression, etc.
});

const Interest = mongoose.model("Interest", InterestSchema);
export default Interest;
