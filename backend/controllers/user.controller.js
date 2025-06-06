import Question from "../models/question.model.js";
import UserQuizConnection from "../models/userQuizConnection.model.js";

export const addUserQuiz = async (req, res) => {
  try {
    const { quesId, quizId, status } = req.params;
    const userId = req.user._id;
    const allowedStatus = ["pending", "correct", "wrong"];
    if (!allowedStatus.includes(status)) {
      throw new Error("status is invalid");
    }
    const allQues = await Question.find({
      quizId,
    });
    if (allQues) {
      throw new Error("");
    }
    allQues.map(async (ques) => {
      const newConnection = new UserQuizConnection({
        quiz: quizId,
        question: quesId,
        user: userId,
        status,
      });
      await newConnection.save();
    });

    res.status(201).json({ data: newConnection, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
