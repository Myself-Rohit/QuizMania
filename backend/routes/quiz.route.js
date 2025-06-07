import express from "express";
import {
  addQuestion,
  createQuiz,
  getAllQuiz,
  getQuiz,
  getUserQuiz,
} from "../controllers/quiz.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/create", verifyToken, createQuiz);
router.post("/create/:quizId", verifyToken, addQuestion);
router.get("/user", verifyToken, getUserQuiz);
router.get("/:quizId", verifyToken, getQuiz);
router.get("/", verifyToken, getAllQuiz);
export default router;
