import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import useGetQuizById from "../hooks/useGetQuizById";

const Quiz = () => {
  const { quizId } = useParams();
  const { data } = useGetQuizById(quizId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4 gap-5">
      {data.length &&
        data.map((quizData, index) => (
          <div
            key={quizData._id}
            className={`bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full`}
          >
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Quiz Time!
            </h1>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">{quizData?.question}</h2>
              <div className="space-y-3">
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 border transition`}
                >
                  {quizData?.options[0].option}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 border transition`}
                >
                  {quizData?.options[1].option}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 border transition`}
                >
                  {quizData?.options[2].option}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 border transition`}
                >
                  {quizData?.options[3].option}
                </button>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              Submit Answer
            </button>

            <div className="mt-4 text-sm text-gray-500 text-center">
              Question {index + 1} of {data.length}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Quiz;
