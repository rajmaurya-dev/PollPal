import jwt from "jsonwebtoken";
export const sendCookie = (
  user,
  res,
  message,
  statusCode = 200,
  id,
  username
) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: "true",
      id,
      message,
      username,
    });
};
