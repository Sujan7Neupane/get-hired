import { useState } from "react";
import { FaArrowLeft, FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetJobByIdQuery } from "../redux/slices/jobApiSlice";
import {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
} from "../redux/slices/applicationApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface ApplyFormData {
  resume: FileList;
  coverLetter: string;
}

const JobDetailsPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state: any) => state.auth);

  const [showApplyForm, setShowApplyForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyFormData>();

  const [applyJob, { isLoading: isApplying }] = useApplyJobMutation();

  const { data: applicationsData } = useGetMyApplicationsQuery(undefined, {
    skip: user?.role !== "candidate",
  });
  // console.log(applicationsData);

  const hasAlreadyApplied =
    applicationsData?.applications.some(
      (application) => application.job._id === id,
    ) ?? false;

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

  const job = data.job;

  const handleApply = async (formData: ApplyFormData) => {
    try {
      const applicationData = new FormData();

      applicationData.append("resume", formData.resume[0]);
      applicationData.append("coverLetter", formData.coverLetter);

      await applyJob({
        jobId: id,
        formData: applicationData,
      }).unwrap();

      toast.success("Application submitted successfully.");

      setShowApplyForm(false);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit application.");
    }
  };

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
                {job.company.name}
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
                  {new Date(job.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {user?.role === "candidate" && job.status === "open" && (
              <div className="mt-6">
                {hasAlreadyApplied ? (
                  <div className="rounded-lg border border-success/30 bg-success/10 p-3 text-center text-sm font-medium text-success">
                    You have already applied for this job.
                  </div>
                ) : !showApplyForm ? (
                  <Button
                    className="w-full"
                    onClick={() => setShowApplyForm(true)}
                  >
                    Apply for this job
                  </Button>
                ) : (
                  <form
                    onSubmit={handleSubmit(handleApply)}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Resume
                      </label>

                      <Input
                        type="file"
                        accept=".pdf"
                        {...register("resume", {
                          required: "Resume is required.",
                        })}
                      />

                      {errors.resume && (
                        <p className="mt-1 text-sm text-error">
                          {errors.resume.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Cover Letter
                      </label>

                      <textarea
                        {...register("coverLetter")}
                        placeholder="Write a short cover letter..."
                        className="textarea textarea-bordered w-full"
                        rows={5}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isApplying}
                      >
                        {isApplying ? "Submitting..." : "Submit Application"}
                      </Button>

                      <Button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setShowApplyForm(false);
                          reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
