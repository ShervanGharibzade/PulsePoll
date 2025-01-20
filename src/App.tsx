import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

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
      </Routes>
    </Router>
  );
}

export default App;
