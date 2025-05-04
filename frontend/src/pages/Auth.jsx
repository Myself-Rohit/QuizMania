import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
const Auth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const { setLoggedInUser } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/${
          isSignIn ? "signin" : "signup"
        }`,
        { userName, password },
        { withCredentials: true }
      );

      if (res.data) {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        setLoggedInUser(res.data);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "failed to Signin"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6"
    >
      <h1 className="text-3xl font-bold">{isSignIn ? "Sign In" : "Sign Up"}</h1>
      <div className="bg-gray-800 p-6 mt-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
            <input
              type="userName"
              placeholder="userName"
              className="flex-1 bg-transparent focus:outline-none text-white"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
            <input
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent focus:outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-green-600 p-3 rounded-lg hover:bg-green-500 w-full text-center font-semibold">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-gray-400 text-sm text-center mt-2">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-green-500 cursor-pointer"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};
export default Auth;
