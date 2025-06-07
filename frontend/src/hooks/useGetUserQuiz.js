import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

const useGetUserQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //   const navigate = useNavigate();
  const getUserQuiz = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/quiz/user`,
        { withCredentials: true }
      );

      if (res.data) {
        setData(res.data?.data);
      }
    } catch (error) {
      //   navigate("/auth");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserQuiz();
  }, []);
  return { loading, data };
};

export default useGetUserQuiz;
