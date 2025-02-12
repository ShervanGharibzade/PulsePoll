import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="bg-zinc-800">
              <HomePage />
            </main>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
