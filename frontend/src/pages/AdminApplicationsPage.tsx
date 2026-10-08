import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useGetApplicationsQuery } from "../redux/slices/adminApiSlice";

const AdminApplicationsPage = () => {
  const { data, isLoading, error } = useGetApplicationsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load applications." />;
  }

  const applications = data?.applications || [];

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold">Application Management</h1>

        <p className="mt-2 text-base-content/60">
          View applications submitted across the platform.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
        {applications.length === 0 ? (
          <div className="p-6 text-center text-sm text-base-content/60">
            No applications found.
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Status</th>
                <th className="hidden sm:table-cell">Applied</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>
                    <div className="font-medium">
                      {application.candidate.fullName}
                    </div>

                    <div className="mt-1 break-all text-sm text-base-content/60">
                      {application.candidate.email}
                    </div>
                  </td>

                  <td>{application.job.title}</td>

                  <td>
                    <span className="badge badge-outline capitalize">
                      {application.status}
                    </span>
                  </td>

                  <td className="hidden sm:table-cell">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminApplicationsPage;
