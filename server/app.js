import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./config/database.js";
import authRouter from "./routes/auth.js";
import pollRouter from "./routes/poll.js";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.json({ hell: "no" }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorMiddleware);
app.use("/api/auth", authRouter);
app.use("/api/polls", pollRouter);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT}`);
});
