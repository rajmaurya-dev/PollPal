import { Poll } from "../models/poll.js";
import { User } from "../models/users.js";

export const showPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find().populate("user", ["username", "id"]);
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const userPolls = async (req, res, next) => {
  const { _id } = req.decoded;
  try {
    const user = await User.findById(_id).populate("polls");
    res.status(200).json(user.polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const createPoll = async (req, res, next) => {
  if (!req.decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { _id } = req.decoded;

  const { title, options } = req.body;
  try {
    let user = await User.findById(_id).populate("polls");
    const poll = await Poll.create({
      title,
      user: user._id,
      options: options.map((option) => ({ option, votes: 0 })),
    });

    user.polls.push(poll._id);
    await user.save();
    await poll.populate("user");
    res.status(201).json({
      ...poll.toJSON(),
      user: user.toJSON(),
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id).populate("user", ["username", "id"]);
    if (!poll) throw new Error("No such poll found");
    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const deletePoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.decoded;
    const poll = await Poll.findById(id);
    if (!poll) throw new Error("No such poll found");
    if (poll.user.toString() !== _id) {
      throw new Error("Unauthorized Access");
    }
    await poll.deleteOne();
    res.status(202).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};