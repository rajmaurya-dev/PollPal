import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./config/database.js";
import authRouter from "./routes/auth.js";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.json({ hell: "no" }));

app.use(cors());
app.use(bodyParser.json());
app.use(errorMiddleware);
app.use("/api/auth", authRouter);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT}`);
});
