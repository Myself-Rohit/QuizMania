import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
