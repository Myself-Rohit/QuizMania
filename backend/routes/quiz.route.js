import express from "express";
import { createQuiz } from "../controllers/quiz.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createQuiz);
export default router;
