import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlices";

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [logoutApi, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const logoutResponse = await logoutApi().unwrap();

      dispatch(logout());
      navigate("/login");
      toast.success(logoutResponse.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

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
        <div className="navbar-end hidden lg:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-200">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <span>{user.fullName}</span>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-100 mt-3 w-64 rounded-box border border-base-300 bg-white! text-black! p-2 shadow-xl"
              >
                <li className="pointer-events-none">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{user.fullName}</span>

                    <span className="text-xs opacity-60">{user.email}</span>
                  </div>
                </li>

                <div className="divider my-1"></div>

                {user.role === "candidate" && (
                  <>
                    <li>
                      <Link to="/candidate/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>

                    <li>
                      <Link to="/applications">My Applications</Link>
                    </li>

                    <li>
                      <Link to="/saved-jobs">Saved Jobs</Link>
                    </li>
                  </>
                )}

                {user.role === "employer" && (
                  <>
                    <li>
                      <Link to="/employer/dashboard">Dashboard</Link>
                    </li>

                    <li>
                      <Link to="/employer/company">My Company</Link>
                    </li>

                    <li>
                      <Link to="/employer/jobs">My Jobs</Link>
                    </li>
                  </>
                )}

                {user.role === "admin" && (
                  <li>
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}

                <div className="divider my-1"></div>

                <li>
                  <button
                    disabled={isLoading}
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>

              <Link to="/register" className="btn btn-neutral">
                Get Started
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-end lg:hidden">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              {user ? (
                user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-200">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )
              ) : (
                <FaBars />
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-100 mt-3 w-64 rounded-box border border-base-300 bg-white! text-black! p-2 shadow-xl"
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

              <div className="divider my-1"></div>

              {user ? (
                <>
                  <li className="pointer-events-none">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{user.fullName}</span>

                      <span className="text-xs opacity-60">{user.email}</span>
                    </div>
                  </li>

                  <div className="divider my-1"></div>

                  {user.role === "candidate" && (
                    <>
                      <li>
                        <Link to="/candidate/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>

                      <li>
                        <Link to="/applications">My Applications</Link>
                      </li>

                      <li>
                        <Link to="/saved-jobs">Saved Jobs</Link>
                      </li>
                    </>
                  )}

                  {user.role === "employer" && (
                    <>
                      <li>
                        <Link to="/employer/dashboard">Dashboard</Link>
                      </li>

                      <li>
                        <Link to="/employer/company">My Company</Link>
                      </li>

                      <li>
                        <Link to="/employer/jobs">My Jobs</Link>
                      </li>
                    </>
                  )}

                  {user.role === "admin" && (
                    <li>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                  )}

                  <div className="divider my-1"></div>

                  <li>
                    <button
                      disabled={isLoading}
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>

                  <li>
                    <Link to="/register">Get Started</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
