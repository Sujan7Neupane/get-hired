import { useGetAdminDashboardQuery } from "../redux/slices/dashboardApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { Link } from "react-router";

const AdminDashboardPage = () => {
  const { data, isLoading, error } = useGetAdminDashboardQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load dashboard." />;
  }

  const dashboard = data?.dashboard;

  if (!dashboard) {
    return <Error message="Dashboard data not found." />;
  }

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-base-content/60">
          Overview of your recruitment platform.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Users</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.totalUsers}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Candidates</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.totalCandidates}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Employers</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.totalEmployers}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Companies</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.totalCompanies}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Jobs</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.totalJobs}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Open Jobs</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.openJobs}</p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Applications</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.totalApplications}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Users</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Users who recently joined the platform.
            </p>
          </div>

          <Link to="/admin/users" className="btn btn-sm btn-ghost">
            View Users
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-box border border-base-300">
          {dashboard.recentUsers.length === 0 ? (
            <div className="p-6 text-center text-sm text-base-content/60">
              No users have joined yet.
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hidden sm:table-cell">Email</th>
                  <th>Role</th>
                  <th className="hidden md:table-cell">Joined</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="font-medium">{user.fullName}</div>

                      <div className="mt-1 break-all text-sm text-base-content/60 sm:hidden">
                        {user.email}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell">{user.email}</td>
                    <td>
                      <span className="badge badge-outline capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="hidden md:table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
