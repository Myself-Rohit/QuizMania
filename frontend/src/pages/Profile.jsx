import Header from "../components/Header";
import useGetUserQuiz from "../hooks/useGetUserQuiz";
import { Link } from "react-router";

const Profile = () => {
  const { data } = useGetUserQuiz();

  return (
    <>
      <Header />
      {/* profile section */}
      <div className="p-5">
        <div className=" flex gap-4 ">
          <img
            className="rounded-full w-60"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user"
          />
          <div className="bg-base-200 p-3 rounded-xl text-center grow">
            <h1 className="text-4xl ">John Doe</h1>
            <div className="flex flex-col gap-3 mt-10 max-w-72 mx-auto">
              <input
                min="1"
                type="number"
                placeholder="Enter age"
                className="p-2 rounded-sm"
              />
              <select className="p-2 rounded-sm">
                <option value="" disabled>
                  choose gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button className="bg-blue-500 p-2 rounded text-white font-semibold ">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Quiz */}

        {data?.length ? (
          <div className="flex gap-5 flex-wrap mt-10">
            {/* Add Quiz */}
            <div className="flex flex-col items-center min-h-full gap-2 bg-base-300 p-5 rounded grow max-w-96 cursor-pointer">
              <img
                className="w-36"
                src="https://cdn-icons-png.flaticon.com/128/2891/2891421.png"
              />
              <Link to={`/`} className="">
                Add Quiz
              </Link>
            </div>
            {/* created Quiz */}
            {data.length &&
              data.map((quiz) => {
                return (
                  <div key={quiz?._id} className="card bg-base-200 max-w-96">
                    <div className="card-body">
                      <h2 className="font-semibold text-gray-500 flex items-center justify-between">
                        <span className="">
                          {quiz?.questions?.length} questions
                        </span>{" "}
                        <div className="card-actions justify-end">
                          <Link to={`/quiz/${quiz?._id}`} className="btn">
                            Edit
                          </Link>
                        </div>
                      </h2>
                      <p className="card-title">
                        {" "}
                        {quiz?.questions[0]?.question}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="bg-base-200 rounded p-5 mt-10">No Quiz Created</div>
        )}
      </div>
    </>
  );
};

export default Profile;
