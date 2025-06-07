import { Link, useParams } from "react-router";
import useGetQuizById from "../hooks/useGetQuizById";

const StartQuiz = () => {
  const { quizId } = useParams();
  const { data } = useGetQuizById(quizId);
  console.log(data);
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <Link to="/" className="btn btn-ghost text-xl justify-end">
          QuizMania
        </Link>
        <a className="btn btn-ghost text-xl justify-end">setting</a>
      </div>
      <Link to={`/quiz/${quizId}`} className="">
        <img
          className="h-[30vw] md:h-[20vh] mx-auto mt-10 active:scale-95"
          src="https://cdn1.iconfinder.com/data/icons/elevator/154/elevator-start-function-go-256.png"
        />
      </Link>
      <div className="text-white text-center mt-20 flex justify-center pb-10">
        <ul className="px-10 max-w-md">
          <li className="mt-5">
            ✅ <strong>Total Questions:</strong> This quiz contain
            {" " + data?.length} question each with 4 options.
          </li>
          <li className="mt-5">
            ✅ <strong>Correct Answer:</strong> +10 points will be awarded for
            each correct answer.
          </li>
          <li className="mt-5">
            ❌ <strong>Wrong Answer:</strong> -5 points will be deducted for
            each wrong answer.
          </li>
          <li className="mt-5">
            💾 <strong>Answer Saving:</strong> Your selected answer will be
            saved automatically before the next question appears. You cannot go
            back to change it.
          </li>

          <li className="mt-5">
            🚫 <strong>No Skipping:</strong> Skipping a question counts as a
            wrong answer unless otherwise mentioned.
          </li>
        </ul>
      </div>
    </>
  );
};
export default StartQuiz;
