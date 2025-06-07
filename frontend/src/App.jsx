import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import StartQuiz from "./pages/StartQuiz";
import Quiz from "./pages/QuizPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:quizId" element={<StartQuiz />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
