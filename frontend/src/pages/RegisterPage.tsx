import { Link } from "react-router";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md">
        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>

            <p className="mt-2 text-sm text-base-content/60">
              Join getHired and find your next opportunity
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            <span className="text-base-content/60">
              Already have an account?{" "}
            </span>

            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
