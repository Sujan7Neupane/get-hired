import { Link } from "react-router";
import { useGetJobsQuery } from "../../redux/slices/jobApiSlice";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { useSelector } from "react-redux";
import {
  useDeleteSavedJobMutation,
  useGetSavedJobsQuery,
  useSaveJobMutation,
} from "../../redux/slices/savedJobApiSlice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const FeaturedJobs = () => {
  const { data, isLoading, error } = useGetJobsQuery({});
  const jobs = data?.jobs ?? [];

  // console.log(jobs);

  const { user } = useSelector((state: any) => state.auth);

  const { data: savedJobsData } = useGetSavedJobsQuery(undefined, {
    skip: user?.role !== "candidate",
  });

  const [saveJob] = useSaveJobMutation();
  const [deleteSavedJob] = useDeleteSavedJobMutation();

  const isJobSaved = (jobId: string) => {
    return (
      savedJobsData?.savedJobs.some((savedJob) => savedJob.job._id === jobId) ??
      false
    );
  };

  const handleSaveJob = async (jobId: string) => {
    if (isJobSaved(jobId)) {
      await deleteSavedJob(jobId).unwrap();
    } else {
      await saveJob(jobId).unwrap();
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error message="Failed to load jobs." />
      ) : (
        <section className="py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured Jobs</h2>
              <p className="mt-2 text-base-content/60">
                Explore some of the latest opportunities.
              </p>
            </div>

            <Link to="/jobs" className="btn btn-ghost hidden sm:flex">
              View All Jobs
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="card border border-base-300 bg-base-100 shadow-sm"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="card-title">{job.title}</h3>

                      <p className="mt-1 text-sm text-base-content/60">
                        {job.company.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="badge badge-outline whitespace-nowrap">
                        {job.employmentType}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-base-content/60">
                    <p>
                      {job.location.city}, {job.location.country}
                    </p>

                    <p>
                      {job.experienceLevel} ·{" "}
                      {job.salary?.min && job.salary?.max
                        ? `${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency}`
                        : "Salary not specified"}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="badge badge-ghost">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions mt-5 justify-between">
                    {user?.role === "candidate" && (
                      <button
                        type="button"
                        onClick={() => handleSaveJob(job._id)}
                        className="btn btn-sm btn-ghost gap-2"
                        aria-label={
                          isJobSaved(job._id) ? "Remove saved job" : "Save job"
                        }
                      >
                        {isJobSaved(job._id) ? (
                          <FaBookmark />
                        ) : (
                          <FaRegBookmark />
                        )}
                        {isJobSaved(job._id) ? "Saved" : "Save"}
                      </button>
                    )}

                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/jobs" className="btn btn-outline mt-6 w-full sm:hidden">
            View All Jobs
          </Link>
        </section>
      )}
    </>
  );
};

export default FeaturedJobs;
