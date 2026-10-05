import { useGetCandidateDashboardQuery } from "../redux/slices/dashboardApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { Link } from "react-router";

const CandidateDashboardPage = () => {
  const { data, isLoading, error } = useGetCandidateDashboardQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load dashboard." />;
  }

  const dashboard = data?.dashboard;
  //   console.log(dashboard);

  if (!dashboard) {
    return <Error message="Dashboard data not found." />;
  }

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold">Candidate Dashboard</h1>

        <p className="mt-2 text-base-content/60">
          Overview of your job applications and saved jobs.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Applications</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.totalApplications}
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Pending</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.pendingApplications}
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Shortlisted</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.shortlistedApplications}
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Hired</p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.hiredApplications}
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Saved Jobs</p>

          <p className="mt-2 text-3xl font-bold">{dashboard.savedJobs}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Recent Applications */}
        <div>
          <div>
            <h2 className="text-xl font-semibold">Recent Applications</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Your latest job applications.
            </p>
          </div>

          <div className="mt-4 rounded-box border border-base-300">
            {dashboard.recentApplications.length === 0 ? (
              <div className="p-6 text-center text-sm text-base-content/60">
                You haven't applied for any jobs yet.
              </div>
            ) : (
              <div className="divide-y divide-base-300">
                {dashboard.recentApplications.map((application) => (
                  <div
                    key={application._id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <h3 className="font-medium">{application.job.title}</h3>

                      <p className="mt-1 text-sm text-base-content/60">
                        {application.job.company.name}
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
            <h2 className="text-xl font-semibold">Recently Saved Jobs</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Jobs you recently saved.
            </p>
          </div>

          <div className="mt-4 rounded-box border border-base-300">
            {dashboard.recentSavedJobs.length === 0 ? (
              <div className="p-6 text-center text-sm text-base-content/60">
                You haven't saved any jobs yet.
              </div>
            ) : (
              <div className="divide-y divide-base-300">
                {dashboard.recentSavedJobs.map((savedJob) => (
                  <div
                    key={savedJob._id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <h3 className="font-medium">{savedJob.job.title}</h3>

                      <p className="mt-1 text-sm text-base-content/60">
                        {savedJob.job.company.name}
                      </p>
                    </div>

                    <Link
                      to={`/jobs/${savedJob.job._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      View Job
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateDashboardPage;
