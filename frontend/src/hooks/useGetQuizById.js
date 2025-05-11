import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetQuizById = (id) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getQuiz = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${id}`,
        { withCredentials: true }
      );
      if (res.data) {
        setData(res?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);
  return { loading, data, getQuiz };
};

export default useGetQuizById;
