import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  votedPolls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", UserSchema);
