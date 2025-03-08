import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../../components/button";
import { pageRoutes } from "../../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../restApi/auth/login";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../components/toast";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormInputs) => login(data),
    onSuccess: () => {
      navigate(pageRoutes.home);
    },
    onError: (error: any) => {
      showToast(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    loginMutation.mutate(data);
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white text-lg">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="rounded-md px-2 text-zinc-700 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium"
            />
            {errors.username && (
              <span className="text-red-400 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-white text-lg">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="rounded-md px-2 py-2 bg-slate-200 text-sm outline-none placeholder:text-sm placeholder:font-medium text-zinc-700"
            />
            {errors.password && (
              <span className="text-red-400 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" title="Submit" className="my-5" />
        </form>

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
