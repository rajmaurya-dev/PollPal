import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login first",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  req.decoded = decoded;
  next();
};
