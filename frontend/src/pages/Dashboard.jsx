import React, { useState } from "react";
import Header from "../components/Header";
import useGetDashboardQuiz from "../hooks/useGetDashboardQuiz";

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
                  <h2 className="font-semibold">
                    Created By {quiz?.userId?.userName}
                  </h2>
                  <p className="card-title"> {quiz?.question} </p>
                  <div className="card-actions justify-end">
                    <button className="btn">View All</button>
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
