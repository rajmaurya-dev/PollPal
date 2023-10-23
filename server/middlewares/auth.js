import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (e) {
    next();
  }
};
