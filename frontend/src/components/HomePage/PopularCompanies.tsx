import { Link } from "react-router";
import { useGetCompaniesQuery } from "../../redux/slices/companyApiSlice";

import Loading from "../ui/Loading";
import Error from "../ui/Error";

const PopularCompanies = () => {
  const { data, isLoading, error } = useGetCompaniesQuery();
  const companies = data?.companies ?? [];

  return (
    <section className="border-y border-base-300 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Popular Companies</h2>

          <p className="mt-2 text-base-content/60">
            Explore companies hiring talented professionals.
          </p>
        </div>

        <Link to="/companies" className="btn btn-ghost hidden sm:flex">
          View All Companies
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error message="Failed to load companies data." />
        ) : (
          <>
            {companies.map((company) => (
              <Link
                to={`/companies/${company._id}`}
                className="rounded-box border border-base-300 bg-base-100 p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
                key={company._id}
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-box bg-base-200">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {company.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-semibold">{company.name}</h3>

                <p className="mt-1 text-sm text-base-content/60">
                  {company.industry}
                </p>
              </Link>
            ))}
          </>
        )}
      </div>

      <Link to="/companies" className="btn btn-outline mt-6 w-full sm:hidden">
        View All Companies
      </Link>
    </section>
  );
};

export default PopularCompanies;
