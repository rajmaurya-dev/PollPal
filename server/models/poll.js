import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Poll = mongoose.model("Poll", pollSchema);
