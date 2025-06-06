import React, { useState } from "react";
import Header from "../components/Header";
import useGetDashboardQuiz from "../hooks/useGetDashboardQuiz";
import { Link } from "react-router";

const Dashboard = () => {
  const { data } = useGetDashboardQuiz();
  if (!data || !data.length) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <Header />
      <div className="flex gap-5 flex-wrap mt-10">
        {data.length &&
          data.map((quiz) => {
            return (
              <div key={quiz._id} className="card bg-base-200 w-96">
                <div className="card-body">
                  <h2 className="font-semibold text-gray-500 flex items-center justify-between">
                    <span>By {quiz?.createdBy?.userName}</span>
                    <span className="right-0">
                      {quiz?.questions.length} questions
                    </span>
                  </h2>
                  <p className="card-title"> {quiz?.questions[0].question} </p>
                  <div className="card-actions justify-end">
                    <Link to={`/${quiz._id}`} className="btn">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard;
