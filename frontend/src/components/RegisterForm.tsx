import toast from "react-hot-toast";
import { useRegisterMutation } from "../redux/slices/authApiSlice";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [registerApi, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    // console.log(data);
    try {
      const registerResponse = await registerApi(data).unwrap();
      // console.log(registerResponse);
      toast.success(registerResponse.message);
      navigate("/login");
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.error || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Full Name</label>

        <Input
          type="text"
          placeholder="Enter your fullname"
          className="input input-bordered w-full"
          {...register("fullName", {
            required: "Full name is required.",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters.",
            },
            maxLength: {
              value: 50,
              message: "Full name cannot exceed 50 characters.",
            },
            pattern: {
              value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
              message: "Enter your first and last name.",
            },
          })}
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

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
          placeholder="Create a password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
            maxLength: {
              value: 50,
              message: "Password cannot exceed 50 characters.",
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
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
