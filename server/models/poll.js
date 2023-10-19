import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Poll = mongoose.model("Poll", pollSchema);
