import { sendCookie } from "../utils/feature.js";
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
    const { id } = user;
    sendCookie(
      user,
      res,
      `successfully registered ${user.username}`,
      200,
      id,
      username
    );
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
      sendCookie(
        user,
        res,
        `successfully logged in ${user.username}`,
        200,
        id,
        username
      );
    } else {
      res.json({ message: "some error" });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(0),
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
    })
    .json({
      success: "true",
      user: req.user,
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: "true",
    user: req.user,
  });
};
