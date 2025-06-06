import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { addUserQuiz } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create/:quizId/:quesId/:status", verifyToken, addUserQuiz);

export default router;
