import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "correct", "wrong"],
        message: `{VALUES} is invalid status type`,
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const UserQuizConnection = mongoose.model(
  "UserQuizConnection",
  connectionSchema
);
export default UserQuizConnection;
