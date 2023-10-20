import { Poll } from "../models/poll.js";

export const showPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export const createPoll = async (req, res, next) => {
  try {
    const { title, options } = req.body;
    const poll = Poll.create({
      title,
      options: options.map((option) => ({ option, votes: 0 })),
    });
    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
