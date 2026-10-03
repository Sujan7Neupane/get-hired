import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useLoginMutation } from "../redux/slices/authApiSlice";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlices";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loginApi, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginResponse = await loginApi(data).unwrap();

      dispatch(login(loginResponse.user));

      toast.success(loginResponse.message);

      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.error || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <Input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          })}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <Input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="btn btn-neutral w-full"
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
