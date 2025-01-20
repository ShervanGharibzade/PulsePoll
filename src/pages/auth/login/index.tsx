import { useState } from "react";
import Button from "../../../components/button";
import { apiRoutes, pageRoutes } from "../../../routes/routes";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsernamme] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "username") {
      setUsernamme(value);
      return;
    }
    setPassword(value);
    return;
  };

  const loginInfo = async () => {
    if (username && password) {
      try {
        const response = await fetch(apiRoutes.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to log in");
        }

        const data = await response.json();
        console.log("Logged in successfully:", data);

        localStorage.setItem("access_token", data.access_token);
        console.log("Access Token:", data.access_token);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen w-full flex items-center">
      <div className="min-w-[400px] mx-auto bg-zinc-700 shadow-xl shadow-zinc-900 flex flex-col gap-4 p-5 rounded-md">
        <h2 className="text-white font-bold text-2xl text-center my-3">
          Login To
          <Link
            to={pageRoutes.home}
            className="text-blue-400 pl-2 cursor-pointer"
          >
            PlusePoll
          </Link>
        </h2>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-white text-lg">username</label>
          <input
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={onChange}
            className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-white text-lg">password</label>
          <input
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
            className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
          />
        </div>
        <Button title="submit" className="my-5" onClick={loginInfo} />
        <p className="text-white text-center">
          And if you have not account
          <Link to={pageRoutes.signUp} className="text-blue-400 pl-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
