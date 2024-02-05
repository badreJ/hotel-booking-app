import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        message: "Registration successful!",
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
    <div className="bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-500 to-blue-600 min-h-screen">
      <div className="pt-3">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-white">Book a room,</span>
          <span className="bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text">
            get a view @
          </span>
        </h1>
        <p className="text-center mr-7  ">
          <span className="text-4xl text-white font-bold tracking-tight animate-pulse border-b-4">
            <Link to="/" className="">
              Bookit
              <span className="bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text ">
                .com
              </span>
            </Link>
          </span>
        </p>
      </div>
      <div className="flex ">
        <div className="flex-1">
          <h2>stayed tuned</h2>
        </div>
        <div className="flex-1 ">
          <form className="flex flex-col gap-5 p-20  " onSubmit={onSubmit}>
            <h3 className="text-3xl bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text">
              Create an Account
            </h3>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col md:flex-row ">
                <label className="text-gray-700 text-sm font-bold flex-1">
                  First Name
                  <input
                    placeholder="first name"
                    className="w-full border rounded py-2 font-normal outline-none px-4"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                  ></input>
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                  Last Name
                  <input
                    placeholder="last name"
                    className="w-full border rounded py-2 font-normal outline-none px-4"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  ></input>
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                  placeholder="email"
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
              <label className="text-gray-700 text-sm font-bold flex-1">
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

              <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                  type="password"
                  placeholder="******"
                  className="w-full border rounded py-2 font-normal outline-none px-4"
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (!val) {
                        return "Please enter your password";
                      } else if (watch("password") !== val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                ></input>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>
            <button
              type="submit"
              className="text-xl text-white bg-gradient-to-br from-blue-500 font-bold p-2 transition-all duration-150 hover:translate-y-2"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
