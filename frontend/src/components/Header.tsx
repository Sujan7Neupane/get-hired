import { FaBars } from "react-icons/fa";
import { Link } from "react-router";
import Button from "./ui/Button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95! backdrop-blur">
      <div className="navbar mx-auto max-w-7xl bg-transparent! px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            get<span className="font-normal">Hired</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end hidden gap-3 lg:flex">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>

          <Link to="/register" className="btn btn-neutral">
            Get Started
          </Link>
        </div>

        <div className="navbar-end lg:hidden">
          <div className="dropdown dropdown-end">
            <Button
              className="btn-ghost btn-square"
              aria-label="Open navigation menu"
            >
              <FaBars className="text-lg" />
            </Button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-100 mt-3 w-52 rounded-box border border-base-300 bg-white! p-2 text-black shadow-xl"
            >
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li className="mt-2 border-t border-base-300 pt-2">
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
