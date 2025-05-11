import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        option: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
