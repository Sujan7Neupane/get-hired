import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router";

import { useGetMyApplicationsQuery } from "../redux/slices/applicationApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const MyApplicationsPage = () => {
  const { data, isLoading, error } = useGetMyApplicationsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load your applications." />;
  }

  const applications = data?.applications ?? [];

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-base-content/60">
          Track the jobs you have applied for.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="mt-10 rounded-box border border-base-300 bg-base-100 p-10 text-center">
          <h2 className="text-lg font-semibold">
            You haven't applied for any jobs yet.
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Find a job that matches your skills and submit your application.
          </p>

          <Link to="/jobs" className="btn btn-neutral mt-5">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="text-xl font-semibold hover:text-primary"
                  >
                    {application.job.title}
                  </Link>

                  <p className="mt-1 font-medium">
                    {application.job.company.name}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-base-content/60">
                    <span className="flex items-center gap-2">
                      <FaLocationArrow />
                      {application.job.location.city},{" "}
                      {application.job.location.country}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaBriefcase />
                      {application.job.employmentType}
                    </span>
                  </div>
                </div>

                <span className="badge badge-outline px-4 py-3 capitalize">
                  {application.status}
                </span>
              </div>

              <div className="mt-5 border-t border-base-300 pt-4 text-sm text-base-content/60">
                Applied on{" "}
                {new Date(application.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
