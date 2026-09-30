import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              get<span className="font-normal">Hired</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm text-base-content/60">
              Connecting talented people with opportunities that move careers
              forward.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Platform</h3>

            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <Link to="/jobs" className="transition hover:text-base-content">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="transition hover:text-base-content"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition hover:text-base-content"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>

            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <Link
                  to="/about"
                  className="transition hover:text-base-content"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-base-content"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition hover:text-base-content"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">For Employers</h3>

            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <Link
                  to="/employer"
                  className="transition hover:text-base-content"
                >
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/jobs"
                  className="transition hover:text-base-content"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition hover:text-base-content"
                >
                  Employer Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm text-base-content/50">
          &;copy {new Date().getFullYear()} getHired. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
