import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.SignIn, {
    onSuccess: async () => {
      
      showToast({
        message: "Sign in successful!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div className="bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-500 to-blue-600 h-screen ">
      <div className="flex ">
        <div className="flex-1">
          <h1>book.com</h1>
        </div>

        <div className=" flex-1 ">
          <div className="flex flex-col p-32 mt-20  ">
            <h1 className="text-3xl bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text mb-5 py-2 ">
              Sign In
            </h1>
            <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
              <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                  placeholder="email*"
                  type="email"
                  className="w-full border rounded py-2 font-normal outline-none px-4"
                  {...register("email", {
                    required: "Email is required",
                  })}
                ></input>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
              <label className="text-gray-700 text-sm font-bold ">
                Password
                <input
                  type="password"
                  placeholder="******"
                  className="w-full border rounded py-2 font-normal outline-none px-4"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                ></input>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <button
                type="submit"
                className="text-xl text-white bg-gradient-to-br from-blue-500 font-bold p-2 transition-all duration-150 hover:translate-y-2"
              >
                {isLoading ? "loading" : "Login"}
              </button>
              <p className="text-sm">
                Not Registered?{" "}
                <Link
                  className=" bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text"
                  to="/register"
                >
                  Create an account here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
