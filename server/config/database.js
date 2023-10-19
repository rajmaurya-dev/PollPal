import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "pollpal",
    })
    .then((c) => console.log(`DB connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
