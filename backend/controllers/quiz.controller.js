import Question from "../models/question.model.js";
import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const newQuiz = new Quiz({
      createdBy: userId,
      questions: [],
    });
    await newQuiz.save();
    res.status(200).json({ data: newQuiz });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, options } = req.body;
    if (!question) {
      throw new Error("Question is required!");
    }
    if (options.length !== 4) {
      throw new Error("Four options are required!");
    }
    const optionSet = new Set([
      options[0].option,
      options[1].option,
      options[2].option,
      options[3].option,
    ]);
    if (optionSet.size !== 4) {
      throw new Error("No two options can have same value");
    }

    const newQues = new Question({
      quizId,
      question,
      options,
    });

    await newQues.save();

    const updateQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: { questions: newQues },
      },
      { new: true }
    );
    await updateQuiz.save();

    res
      .status(201)
      .json({ data: newQues, message: "Quiz created sucessfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};

export const getAllQuiz = async (req, res) => {
  try {
    const quizArray = await Quiz.find({}).populate("createdBy questions");

    res.status(200).json({ data: quizArray, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      throw new Error("Invalid api call");
    }
    const quizArray = await Question.find({ quizId });
    res.status(200).json({ data: quizArray, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};

export const getUserQuiz = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const userQuiz = await Quiz.find({
      createdBy: userId,
    }).populate("questions");
    res.status(200).json({ data: userQuiz, message: "" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
