import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import authRoute from "./routes/auth.route.js";
import quizRoute from "./routes/quiz.route.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
dotenv.config();
const port = process.env.PORT || 3001;
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected!!");
    app.listen(port, () => {
      console.log(`app running on port: ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/quiz", quizRoute);
