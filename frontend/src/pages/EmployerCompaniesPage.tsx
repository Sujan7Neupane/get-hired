import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useGetEmployerCompaniesQuery } from "../redux/slices/jobApiSlice";

const EmployerCompaniesPage = () => {
  const { data, isLoading, error } = useGetEmployerCompaniesQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load your companies." />;
  }

  const companies = data?.companies ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Companies</h1>

          <p className="mt-1 text-base-content/60">
            Manage the companies you have created.
          </p>
        </div>

        <Link to="/employer/companies/create" className="btn btn-neutral">
          <FaPlus />
          Create Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <div className="mt-10 rounded-box border border-base-300 p-10 text-center">
          <h2 className="text-xl font-semibold">No companies yet</h2>

          <p className="mt-2 text-base-content/60">
            Create your first company to start posting jobs.
          </p>

          <Link
            to="/employer/companies/create"
            className="btn btn-neutral mt-5"
          >
            Create Company
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {companies.map((company) => (
            <div
              key={company._id}
              className="rounded-box border border-base-300 bg-base-100 p-6"
            >
              <div className="flex items-start gap-4">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-16 rounded-box object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-box bg-base-200 font-bold">
                    {company.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="text-xl font-semibold">{company.name}</h2>

                  <p className="mt-1 text-sm text-base-content/60">
                    {company.industry}
                  </p>

                  <p className="mt-2 text-sm text-base-content/60">
                    {company.location.city}, {company.location.country}
                  </p>
                </div>
              </div>

              <p className="mt-5 line-clamp-2 text-sm leading-6 text-base-content/70">
                {company.description}
              </p>

              <div className="mt-5">
                <Link
                  to={`/employer/companies/${company._id}`}
                  className="btn btn-outline btn-sm"
                >
                  View Company
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployerCompaniesPage;
