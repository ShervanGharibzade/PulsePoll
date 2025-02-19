import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import QuestionId from "./pages/home/questionId";

function App() {
  return (
    <div className="bg-zinc-800 min-h-full">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/sign-up" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/question/:id" element={<QuestionId />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
