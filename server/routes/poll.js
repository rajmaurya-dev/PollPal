import express from "express";
import {
  createPoll,
  deletePoll,
  getPoll,
  showPolls,
  userPolls,
} from "../controllers/poll.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", showPolls);
router.get("/user", auth, userPolls);
router.post("/", auth, createPoll);
router.get("/:id", getPoll);
router.delete("/:id", auth, deletePoll);

export default router;
