import express from "express";
import {
  createQuiz,
  getAllQuiz,
  getQuiz,
} from "../controllers/quiz.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create/:quizId", verifyToken, createQuiz);
router.get("/:quizId", verifyToken, getQuiz);
router.get("/", verifyToken, getAllQuiz);
export default router;
