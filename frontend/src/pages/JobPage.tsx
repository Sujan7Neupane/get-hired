import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";

import { useGetJobsQuery } from "../redux/slices/jobApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const JobsPage = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";

  const { data, isLoading, error } = useGetJobsQuery({
    keyword,
    location,
  });

  const jobs = data?.jobs ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load jobs." />;
  }

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">All Jobs</h1>

        <p className="mt-2 text-base-content/60">
          Explore available job opportunities and find your next role.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="mt-10 rounded-box border border-base-300 p-10 text-center">
          <h2 className="text-lg font-semibold">No jobs available</h2>

          <p className="mt-2 text-sm text-base-content/60">
            Check back later for new opportunities.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="card-title">{job.title}</h2>

                    <p className="mt-1 text-sm text-base-content/60">
                      Company ID: {job.company._id}
                    </p>
                  </div>

                  <span className="badge badge-outline whitespace-nowrap">
                    {job.employmentType}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-base-content/60">
                  <p className="flex items-center gap-2">
                    <FaLocationArrow />
                    {job.location.city}, {job.location.country}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaBriefcase />
                    {job.experienceLevel}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="badge badge-ghost">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm">
                  <span className="text-base-content/50">Salary</span>

                  <p className="mt-1 font-medium">
                    {job.salary?.min?.toLocaleString()} -{" "}
                    {job.salary?.max?.toLocaleString()} {job.salary?.currency}
                  </p>
                </div>

                <div className="card-actions mt-5 justify-end">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="btn btn-sm btn-neutral"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
