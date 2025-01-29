import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../components/button";
import { pageRoutes } from "../../../routes/routes";
import { signUp } from "../../../restApi/auth/signout";

interface IUserInfo {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IUserInfo>({
    resolver: yupResolver(schema),
  });

  // Watch all fields to check if they are filled
  const watchAllFields = watch();
  const isFormFilled = Object.values(watchAllFields).every(
    (value) => value?.trim() !== ""
  );

  const onSubmit = async (userInfo: IUserInfo) => {
    setError(null);
    try {
      const data = await signUp(userInfo);
      const token = data.token;

      if (!token) {
        setError("Signup failed. Please try again.");
        return;
      }

      localStorage.setItem("authToken", token);
      navigate(pageRoutes.home);
    } catch {
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen w-full flex items-center">
      <div className="min-w-[400px] mx-auto bg-zinc-700 shadow-xl shadow-zinc-900 flex flex-col gap-4 p-5 rounded-md">
        <h2 className="text-white font-bold text-2xl text-center my-3">
          Sign up To
          <Link
            to={pageRoutes.home}
            className="text-blue-400 pl-2 cursor-pointer"
          >
            PlusePoll
          </Link>
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white text-lg">Username</label>
            <input
              {...register("username")}
              placeholder="Enter your username"
              className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-white text-lg">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-white text-lg">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            title={isSubmitting ? "Signing up..." : "Submit"}
            className="my-5"
            type="submit"
            disabled={!isFormFilled || isSubmitting}
          />

          <p className="text-white text-center">
            Already have an account?{" "}
            <Link
              to={pageRoutes.login}
              className="text-blue-400 font-semibold pl-2"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
