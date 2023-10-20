import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hashedPassword });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const { id } = user;
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.json({
        id,
        token,
        username,
      });
    } else {
      res.json({ message: "some error" });
    }
  } catch (error) {
    next(error);
  }
};
