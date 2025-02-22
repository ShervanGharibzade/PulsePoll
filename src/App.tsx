import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import QuestionId from "./pages/home/questionId";
import { pageRoutes } from "./routes/routes";
import QuestionPublish from "./pages/dashboard/published";

function App() {
  return (
    <div className="bg-zinc-800 min-h-full">
      <Router>
        <Routes>
          <Route path={pageRoutes.home} element={<HomePage />} />
          <Route path={pageRoutes.login} element={<Login />} />
          <Route path={pageRoutes.signUp} element={<Signup />} />
          <Route path={pageRoutes.dashboard} element={<Dashboard />} />
          <Route path={pageRoutes.questionId} element={<QuestionId />} />
          <Route
            path={pageRoutes.questionPublishedList}
            element={<QuestionPublish />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
