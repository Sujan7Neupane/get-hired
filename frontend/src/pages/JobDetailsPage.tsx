import { FaArrowLeft, FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { Link, useParams } from "react-router";

import { useGetJobByIdQuery } from "../redux/slices/jobApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const JobDetailsPage = () => {
  const { id } = useParams();
  //   console.log(id);
  if (!id) {
    return <Error message="Job ID is missing." />;
  }

  const { data, isLoading, error } = useGetJobByIdQuery(id);
  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.job) {
    return <Error message="Failed to load job details." />;
  }

  const job = data?.job ?? [];

  return (
    <div className="mx-auto max-w-5xl py-10">
      <Link
        to="/jobs"
        className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content"
      >
        <FaArrowLeft />
        Back to Jobs
      </Link>

      <div className="rounded-box border border-base-300 bg-base-100 shadow-sm">
        <div className="border-b border-base-300 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                Company ID: {id}
              </p>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                {job.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-base-content/60">
                <span className="flex items-center gap-2">
                  <FaLocationArrow />
                  {job.location.city}, {job.location.country}
                </span>

                <span className="flex items-center gap-2">
                  <FaBriefcase />
                  {job.employmentType}
                </span>
              </div>
            </div>

            <span className="badge badge-outline px-4 py-3">
              {job.experienceLevel}
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
          <div>
            <section>
              <h2 className="text-xl font-semibold">About this job</h2>

              <p className="mt-4 leading-7 text-base-content/70">
                {job.description}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Required Skills</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="badge badge-ghost px-3 py-3">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-box border border-base-300 bg-base-200/40 p-5">
            <h3 className="font-semibold">Job Overview</h3>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-base-content/50">Salary</p>
                <p className="mt-1 font-medium">
                  {job.salary?.min?.toLocaleString()} -{" "}
                  {job.salary?.max?.toLocaleString()} {job.salary?.currency}
                </p>
              </div>

              <div>
                <p className="text-base-content/50">Experience</p>
                <p className="mt-1 font-medium">{job.experienceLevel}</p>
              </div>

              <div>
                <p className="text-base-content/50">Employment Type</p>
                <p className="mt-1 font-medium">{job.employmentType}</p>
              </div>

              <div>
                <p className="text-base-content/50">Location</p>
                <p className="mt-1 font-medium">
                  {job.location.city}, {job.location.country}
                </p>
              </div>

              <div>
                <p className="text-base-content/50">Application Deadline</p>
                <p className="mt-1 font-medium">
                  {new Date(job.expiresAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-base-content/50">Posted</p>
                <p className="mt-1 font-medium">
                  {new Date(job.expiresAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <button className="btn btn-neutral mt-6 w-full">
              Apply for this job
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
