import { Link } from "react-router";
import { useGetCompaniesQuery } from "../redux/slices/adminApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const AdminCompaniesPage = () => {
  const { data, isLoading, error } = useGetCompaniesQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load companies." />;
  }

  const companies = data?.companies || [];

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold">Company Management</h1>

        <p className="mt-2 text-base-content/60">
          View companies registered on the platform.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
        {companies.length === 0 ? (
          <div className="p-6 text-center text-sm text-base-content/60">
            No companies found.
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hidden sm:table-cell">Industry</th>
                <th className="hidden md:table-cell">Location</th>
                <th className="hidden lg:table-cell">Website</th>
                <th className="hidden lg:table-cell">Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 text-sm font-semibold">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="font-medium">{company.name}</p>

                        <p className="mt-1 text-sm text-base-content/60 sm:hidden">
                          {company.industry}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="hidden sm:table-cell">{company.industry}</td>

                  <td className="hidden md:table-cell">
                    <div>
                      <p>{company.location.city}</p>

                      <p className="text-sm text-base-content/60">
                        {company.location.province
                          ? `${company.location.province}, `
                          : ""}
                        {company.location.country}
                      </p>
                    </div>
                  </td>

                  <td className="hidden lg:table-cell">
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <span className="text-base-content/50">N/A</span>
                    )}
                  </td>

                  <td className="hidden lg:table-cell">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <Link
                      to={`/admin/companies/${company._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      View
                    </Link>
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

export default AdminCompaniesPage;
