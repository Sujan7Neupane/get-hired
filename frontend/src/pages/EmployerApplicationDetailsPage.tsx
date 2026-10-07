import { Link, useParams } from "react-router";
import { FaArrowLeft, FaFileAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Dropdown from "../components/ui/Dropdown";

import {
  useGetApplicationQuery,
  useUpdateApplicationStatusMutation,
} from "../redux/slices/applicationApiSlice";

import type { ApplicationStatus } from "../types/application";

const EmployerApplicationDetailsPage = () => {
  const { applicationId } = useParams();

  const { data, isLoading, error } = useGetApplicationQuery(applicationId!);

  const [updateApplicationStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.application) {
    return <Error message="Failed to load application." />;
  }

  const application = data.application;

  const handleStatusChange = async (value: string) => {
    try {
      await updateApplicationStatus({
        applicationId: application._id,
        status: value as ApplicationStatus,
      }).unwrap();

      toast.success("Application status updated.");
    } catch (error) {
      toast.error("Failed to update application status.");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/employer/applications" className="btn btn-ghost btn-sm mb-8">
        <FaArrowLeft />
        Back to Applications
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Application Details</h1>

        <p className="mt-1 text-base-content/60">
          Review this candidate's application.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <label className="mb-4 block text-sm text-base-content/60">
            Candidate
          </label>

          <div className="flex items-center gap-4">
            {application.candidate.profileImage ? (
              <img
                src={application.candidate.profileImage}
                alt={application.candidate.fullName}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-base-200">
                <FaUser className="text-2xl text-base-content/50" />
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold">
                {application.candidate.fullName}
              </h2>

              <p className="text-base-content/60">
                {application.candidate.email}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <label className="mb-1 block text-sm text-base-content/60">Job</label>

          <div className="border-b-2 border-gray-200 px-2 py-3">
            <p className="font-medium">{application.job.title}</p>
          </div>

          <p className="mt-3 text-sm text-base-content/50">
            Applied on {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <div className="w-full max-w-xs">
            <Dropdown
              label="Application Status"
              value={application.status}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Reviewing", value: "reviewing" },
                { label: "Shortlisted", value: "shortlisted" },
                { label: "Rejected", value: "rejected" },
                { label: "Hired", value: "hired" },
                { label: "Withdrawn", value: "withdrawn" },
              ]}
              placeholder="Select status"
              onChange={handleStatusChange}
            />

            {isUpdating && (
              <p className="mt-2 text-sm text-base-content/50">
                Updating status...
              </p>
            )}
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <label className="mb-1 block text-sm text-base-content/60">
            Cover Letter
          </label>

          <div className="border-b-2 border-gray-200 px-2 py-3">
            {application.coverLetter ? (
              <p className="whitespace-pre-line leading-7 text-base-content/70">
                {application.coverLetter}
              </p>
            ) : (
              <p className="text-base-content/50">
                No cover letter was provided.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <label className="mb-1 block text-sm text-base-content/60">
            Resume
          </label>

          <div className="border-b-2 border-gray-200 px-2 py-3">
            <a
              href={application.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neutral btn-sm"
            >
              <FaFileAlt />
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerApplicationDetailsPage;
