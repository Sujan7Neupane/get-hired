import {
  FaArrowLeft,
  FaGlobe,
  FaIndustry,
  FaLocationArrow,
} from "react-icons/fa";
import { Link, useParams } from "react-router";

import { useGetCompanyByIdQuery } from "../redux/slices/companyApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useGetSpecificCompanyJobsQuery } from "../redux/slices/jobApiSlice";

const CompanyDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetCompanyByIdQuery(id!);
  const { data: jobsData } = useGetSpecificCompanyJobsQuery(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.company) {
    return <Error message="Failed to load company details." />;
  }

  const company = data.company;
  const companyJobs = jobsData?.jobs ?? [];

  // console.log(company);
  // console.log(companyJobs);

  return (
    <div className="mx-auto max-w-5xl py-10">
      <Link
        to="/companies"
        className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content"
      >
        <FaArrowLeft />
        Back to Companies
      </Link>

      <div className="rounded-box border border-base-300 bg-base-100 shadow-sm">
        <div className="border-b border-base-300 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-box bg-base-200 sm:h-24 sm:w-24">
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

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{company.name}</h1>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-base-content/60">
                <span className="flex items-center gap-2">
                  <FaIndustry />
                  {company.industry}
                </span>

                <span className="flex items-center gap-2">
                  <FaLocationArrow />
                  {company.location.city}, {company.location.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
          <div>
            <section>
              <h2 className="text-xl font-semibold">About the Company</h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-base-content/70">
                {company.description}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Open Positions</h2>

              {companyJobs.length === 0 ? (
                <p className="mt-4 text-sm text-base-content/60">
                  This company currently has no open positions.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {companyJobs.map((job) => (
                    <Link
                      key={job._id}
                      to={`/jobs/${job._id}`}
                      className="block rounded-box border border-base-300 p-5 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>

                          <p className="mt-1 text-sm text-base-content/60">
                            {job.location.city}, {job.location.country}
                          </p>
                        </div>

                        <span className="badge badge-outline">
                          {job.employmentType}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="h-fit rounded-box border border-base-300 bg-base-200/40 p-5">
            <h3 className="font-semibold">Company Overview</h3>

            <div className="mt-5 space-y-5 text-sm">
              <div>
                <p className="text-base-content/50">Industry</p>
                <p className="mt-1 font-medium">{company.industry}</p>
              </div>

              <div>
                <p className="text-base-content/50">Location</p>
                <p className="mt-1 font-medium">
                  {company.location.city}, {company.location.country}
                </p>
              </div>

              {company.location.province && (
                <div>
                  <p className="text-base-content/50">Province</p>
                  <p className="mt-1 font-medium">
                    {company.location.province}
                  </p>
                </div>
              )}

              {company.location.postalCode && (
                <div>
                  <p className="text-base-content/50">Postal Code</p>
                  <p className="mt-1 font-medium">
                    {company.location.postalCode}
                  </p>
                </div>
              )}

              {company.website && (
                <div>
                  <p className="text-base-content/50">Website</p>

                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <FaGlobe />
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            <Link to="/jobs" className="btn btn-neutral mt-6 w-full">
              View Jobs
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
