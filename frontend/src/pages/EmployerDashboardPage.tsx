import { useGetEmployerDashboardQuery } from "../redux/slices/dashboardApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { Link } from "react-router";

const EmployerDashboardPage = () => {
  const { data, isLoading, error } = useGetEmployerDashboardQuery();

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
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>

        <p className="mt-2 text-base-content/60">
          Overview of your companies, jobs, and applications.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Companies</p>

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

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Hired</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.hiredApplications}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div>
            <h2 className="text-xl font-semibold">Recent Applications</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Applications submitted for your jobs.
            </p>
          </div>

          <Link to="/employer/applications" className="btn btn-sm btn-ghost">
            View All
          </Link>

          <div className="mt-4 rounded-box border border-base-300">
            {dashboard.recentApplications.length === 0 ? (
              <div className="p-6 text-center text-sm text-base-content/60">
                You haven't received any applications yet.
              </div>
            ) : (
              <div className="divide-y divide-base-300">
                {dashboard.recentApplications.map((application) => (
                  <div
                    key={application._id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <h3 className="font-medium">
                        <span>
                          <strong>Applicant's name: </strong>
                        </span>
                        {application.candidate.fullName}
                      </h3>

                      <p className="mt-1 text-sm text-base-content/60">
                        <span>
                          <strong>Job Title: </strong>
                        </span>
                        {application.job.title}
                      </p>
                    </div>

                    <span className="badge badge-outline capitalize">
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <h2 className="text-xl font-semibold">Application Statistics</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Overview of your received applications.
            </p>
          </div>

          <div className="mt-4 rounded-box border border-base-300">
            <div className="divide-y divide-base-300">
              <div className="flex items-center justify-between p-4">
                <span>Pending</span>

                <span className="badge badge-outline">
                  {dashboard.pendingApplications}
                </span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span>Shortlisted</span>

                <span className="badge badge-outline">
                  {dashboard.shortListedApplications}
                </span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span>Hired</span>

                <span className="badge badge-outline">
                  {dashboard.hiredApplications}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerDashboardPage;
