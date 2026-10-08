import { Link, useParams } from "react-router";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useGetCompanyByIdQuery } from "../redux/slices/companyApiSlice";

const AdminCompanyDetailsPage = () => {
  const { companyId } = useParams();

  const { data, isLoading, error } = useGetCompanyByIdQuery(
    companyId as string,
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load company." />;
  }

  const company = data?.company;

  if (!company) {
    return <Error message="Company not found." />;
  }

  return (
    <section className="mx-auto max-w-5xl py-10">
      <div className="mb-6">
        <Link to="/admin/companies" className="btn btn-sm btn-ghost">
          Back to Companies
        </Link>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100">
        <div className="border-b border-base-300 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-20 w-20 rounded-box object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-box bg-base-200 text-2xl font-bold">
                {company.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>

              <p className="mt-1 text-base-content/60">{company.industry}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium text-base-content/60">
              Industry
            </h2>

            <p className="mt-1">{company.industry}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-base-content/60">
              Location
            </h2>

            <p className="mt-1">
              {company.location.city}
              {company.location.province &&
                `, ${company.location.province}`}, {company.location.country}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-base-content/60">
              Website
            </h2>

            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-1 inline-block"
              >
                {company.website}
              </a>
            ) : (
              <p className="mt-1 text-base-content/50">Not provided</p>
            )}
          </div>

          <div>
            <h2 className="text-sm font-medium text-base-content/60">
              Created
            </h2>

            <p className="mt-1">
              {new Date(company.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t border-base-300 p-6">
          <h2 className="text-lg font-semibold">About the Company</h2>

          <p className="mt-3 whitespace-pre-line text-base-content/70">
            {company.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminCompanyDetailsPage;
