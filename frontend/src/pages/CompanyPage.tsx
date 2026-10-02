import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router";

import { useGetCompaniesQuery } from "../redux/slices/companyApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const CompaniesPage = () => {
  const { data, isLoading, error } = useGetCompaniesQuery();

  const companies = data?.companies ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load companies." />;
  }

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">All Companies</h1>

        <p className="mt-2 text-base-content/60">
          Discover companies and explore the opportunities they offer.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="mt-10 rounded-box border border-base-300 p-10 text-center">
          <h2 className="text-lg font-semibold">No companies available</h2>

          <p className="mt-2 text-sm text-base-content/60">
            Check back later for companies hiring on getHired.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company) => (
            <Link
              key={company._id}
              to={`/companies/${company._id}`}
              className="rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-box bg-base-200">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-3xl font-bold">
                    {company.name.charAt(0)}
                  </span>
                )}
              </div>

              <h2 className="mt-5 text-lg font-semibold">{company.name}</h2>

              <p className="mt-1 text-sm text-primary">{company.industry}</p>

              <p className="mt-3 flex items-center gap-2 text-sm text-base-content/60">
                <FaLocationArrow />
                {company.location.city}, {company.location.country}
              </p>

              {company.website && (
                <p className="mt-3 truncate text-sm text-base-content/50">
                  {company.website}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
