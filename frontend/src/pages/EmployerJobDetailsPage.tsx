import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaLocationArrow } from "react-icons/fa";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import {
  useDeleteJobMutation,
  useGetEmployerJobByIdQuery,
} from "../redux/slices/jobApiSlice";
import toast from "react-hot-toast";

const EmployerJobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetEmployerJobByIdQuery(id!);

  const [deleteJob, { isLoading: isDeleteLoading }] = useDeleteJobMutation();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) return;

    try {
      await deleteJob(id).unwrap();

      toast.success("Job deleted successfully");
      navigate("/employer/jobs");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load job." />;
  }

  const job = data?.job;

  if (!job) {
    return <Error message="Job not found." />;
  }

  return (
    <section className="mx-auto max-w-5xl py-10">
      <Link to="/employer/jobs" className="btn btn-ghost btn-sm mb-6 gap-2">
        <FaArrowLeft />
        Back to My Jobs
      </Link>

      <div className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>

            <p className="mt-2 text-lg text-base-content/60">
              {job.company.name}
            </p>
          </div>

          <span className="badge badge-outline badge-lg capitalize">
            {job.status}
          </span>
        </div>

        <div className="mt-8 grid gap-4 border-y border-base-300 py-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-base-content/60">Employment Type</p>

            <p className="mt-1 font-medium capitalize">{job.employmentType}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">Experience Level</p>

            <p className="mt-1 font-medium capitalize">{job.experienceLevel}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">Location</p>

            <p className="mt-1 flex items-center gap-2 font-medium">
              <FaLocationArrow />
              {job.location.city}, {job.location.country}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">Salary</p>

            <p className="mt-1 font-medium">
              {job.salary?.currency}{" "}
              {job.salary?.min?.toLocaleString() ?? "N/A"} -{" "}
              {job.salary?.max?.toLocaleString() ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Job Description</h2>

          <p className="mt-3 whitespace-pre-line leading-7 text-base-content/70">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Skills</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="badge badge-ghost">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-base-content/60">Application Deadline</p>

          <p className="mt-1 font-medium">
            {new Date(job.expiresAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-8 flex gap-3 border-t border-base-300 pt-6">
          <Link
            to={`/employer/jobs/${job._id}/edit`}
            className="btn btn-neutral"
          >
            Edit Job
          </Link>

          <button
            type="button"
            className="btn btn-outline"
            disabled={isDeleteLoading}
            onClick={() => {
              handleDelete(job._id);
            }}
          >
            Delete Job
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmployerJobDetailsPage;
