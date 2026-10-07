import { FaFileAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Dropdown from "../components/ui/Dropdown";

import {
  useGetEmployerApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "../redux/slices/applicationApiSlice";

import type { ApplicationStatus } from "../types/application";

const EmployerApplicationsPage = () => {
  const { data, isLoading, error } = useGetEmployerApplicationsQuery();

  const [updateApplicationStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load applications." />;
  }

  const applications = data?.applications ?? [];

  const handleStatusChange = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      await updateApplicationStatus({
        applicationId,
        status,
      }).unwrap();

      toast.success("Application status updated.");
    } catch (error) {
      toast.error("Failed to update application status.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Applications</h1>

        <p className="mt-1 text-base-content/60">
          Review applications submitted to your jobs.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-box border border-base-300 p-10 text-center">
          <h2 className="text-xl font-semibold">No applications yet</h2>

          <p className="mt-2 text-base-content/60">
            You don't have any applications for your jobs yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-box border border-base-300 bg-base-100 p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  {application.candidate.profileImage ? (
                    <img
                      src={application.candidate.profileImage}
                      alt={application.candidate.fullName}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
                      <FaUser className="text-xl text-base-content/50" />
                    </div>
                  )}

                  <div>
                    <p className="mb-1 text-sm text-base-content/60">
                      Candidate
                    </p>

                    <h2 className="font-semibold">
                      {application.candidate.fullName}
                    </h2>

                    <p className="text-sm text-base-content/60">
                      {application.candidate.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-base-content/60">Job</p>

                  <p className="font-medium">{application.job.title}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-base-content/60">Applied</p>

                  <p className="text-sm">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="w-full md:w-40">
                  <Dropdown
                    label="Status"
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
                    onChange={(value) =>
                      handleStatusChange(
                        application._id,
                        value as ApplicationStatus,
                      )
                    }
                  />

                  {isUpdating && (
                    <p className="mt-1 text-xs text-base-content/50">
                      Updating...
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/employer/applications/${application._id}`}
                    className="btn btn-neutral btn-sm"
                  >
                    View
                  </Link>

                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <FaFileAlt />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployerApplicationsPage;
