import express from "express";
import { createPoll, showPolls } from "../controllers/poll.js";

const router = express.Router();
router.get("/", showPolls);
router.post("/", createPoll);

export default router;
