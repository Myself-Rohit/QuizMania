import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
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
      quizId,
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

export const getAllQuiz = async (req, res) => {
  try {
    const quizArray = await Quiz.find({});
    const quizSet = new Set();
    const uniqueQuiz = quizArray.filter((quiz) => {
      if (!quizSet.has(quiz.quizId.toString())) {
        quizSet.add(quiz.quizId.toString());
        return quiz;
      }
    });
    res.status(200).json({ data: uniqueQuiz, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const skip = req.query.page - 1 || 0;
    const { quizId } = req.params;
    if (!quizId) {
      throw new Error("Invalid api call");
    }
    const quizArray = await Quiz.find({
      $and: [{ quizId }, { userId: req.user._id }],
    })
      .limit(1)
      .skip(skip);
    res.status(200).json({ data: quizArray, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
