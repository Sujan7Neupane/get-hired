import { Link } from "react-router";
import { FaBriefcase } from "react-icons/fa";
import { useGetEmployerJobsQuery } from "../redux/slices/jobApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const EmployerJobsPage = () => {
  const { data, isLoading, error } = useGetEmployerJobsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load your jobs." />;
  }

  const jobs = data?.jobs || [];

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>

          <p className="mt-2 text-base-content/60">
            Manage the jobs you have posted.
          </p>
        </div>

        <Link to="/employer/jobs/create" className="btn btn-neutral">
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="mt-10 rounded-box border border-base-300 p-10 text-center">
          <FaBriefcase className="mx-auto text-3xl text-base-content/40" />

          <h2 className="mt-4 text-xl font-semibold">No jobs yet</h2>

          <p className="mt-2 text-sm text-base-content/60">
            You haven't posted any jobs yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="mt-8 hidden md:block overflow-hidden rounded-box border border-base-300">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="font-semibold">{job.title}</td>

                    <td>{job.company.name}</td>

                    <td>
                      {job.location.city}, {job.location.country}
                    </td>

                    <td className="capitalize">{job.employmentType}</td>

                    <td className="capitalize">{job.experienceLevel}</td>

                    <td>
                      <span className="badge badge-outline capitalize">
                        {job.status}
                      </span>
                    </td>

                    <td className="text-right">
                      <Link
                        to={`/employer/jobs/${job._id}`}
                        className="btn btn-sm btn-ghost"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="mt-8 space-y-4 md:hidden">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="rounded-box border border-base-300 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">{job.title}</h2>

                    <p className="mt-1 text-sm text-base-content/60">
                      {job.company.name}
                    </p>
                  </div>

                  <span className="badge badge-outline capitalize">
                    {job.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-base-content/50">Location</p>
                    <p className="mt-1">
                      {job.location.city}, {job.location.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-base-content/50">Type</p>
                    <p className="mt-1 capitalize">{job.employmentType}</p>
                  </div>

                  <div>
                    <p className="text-base-content/50">Experience</p>
                    <p className="mt-1 capitalize">{job.experienceLevel}</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-base-300 pt-4">
                  <Link
                    to={`/employer/jobs/${job._id}`}
                    className="btn btn-sm btn-ghost w-full"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default EmployerJobsPage;
