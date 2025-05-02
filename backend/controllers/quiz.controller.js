import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { question, answer, optionA, optionB, optionC, optionD } = req.body;
    if (!question || !answer || !optionA || !optionB || !optionC || !optionD) {
      throw new Error("All fields required!");
    }
    const options = new Set([optionA, optionB, optionC, optionD]);
    if (options.size !== 4) {
      throw new Error("No two options can have same value");
    }
    if (!options.has(answer)) {
      throw new Error("Answer does not exist in options");
    }
    const quiz = new Quiz({
      userId: req.user,
      question,
      answer,
      optionA,
      optionB,
      optionC,
      optionD,
    });
    await quiz.save();
    res.status(201).json({ data: quiz, message: "Quiz created sucessfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
