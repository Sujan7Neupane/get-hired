import { Link, useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoginPage = () => {
  const { user } = useSelector((state: any) => state.auth);
  // console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md">
        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>

            <p className="mt-2 text-sm text-base-content/60">
              Sign in to your getHired account
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <span className="text-base-content/60">
              Don't have an account?{" "}
            </span>

            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
