import { Link } from "react-router";
import { FaBookmark } from "react-icons/fa";
import {
  useDeleteSavedJobMutation,
  useGetSavedJobsQuery,
} from "../redux/slices/savedJobApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const SavedJobsPage = () => {
  const { data, isLoading, error } = useGetSavedJobsQuery();
  const [deleteSavedJob] = useDeleteSavedJobMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load saved jobs." />;
  }

  const savedJobs = data?.savedJobs ?? [];

  return (
    <section className="py-10">
      <div>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="mt-2 text-base-content/60">Jobs you saved for later.</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="mt-10 rounded-lg border border-base-300 p-10 text-center">
          <FaBookmark className="mx-auto text-2xl" />

          <h2 className="mt-4 text-lg font-semibold">No saved jobs yet</h2>

          <p className="mt-2 text-sm text-base-content/60">
            Save jobs you're interested in and come back to them later.
          </p>

          <Link to="/jobs" className="btn btn-neutral mt-5">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((savedJob) => {
            const job = savedJob.job;

            return (
              <div
                key={savedJob._id}
                className="card border border-base-300 bg-base-100 shadow-sm"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="card-title">{job.title}</h2>

                      <p className="mt-1 text-sm text-base-content/60">
                        {job.company.name}
                      </p>
                    </div>

                    <div className="badge badge-outline whitespace-nowrap">
                      {job.employmentType}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-base-content/60">
                    <p>
                      {job.location.city}, {job.location.country}
                    </p>

                    <p>{job.experienceLevel}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="badge badge-ghost">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions mt-5 justify-between">
                    <button
                      type="button"
                      onClick={() => deleteSavedJob(job._id)}
                      className="btn btn-sm btn-ghost gap-2"
                    >
                      <FaBookmark />
                      Saved
                    </button>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SavedJobsPage;
