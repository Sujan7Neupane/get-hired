import { Link } from "react-router";

import { useGetEmployerCompaniesQuery } from "../redux/slices/jobApiSlice";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import PostJobForm from "../components/PostJobForm";

const PostJobPage = () => {
  const {
    data: companyData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useGetEmployerCompaniesQuery();

  if (companiesLoading) {
    return <Loading />;
  }

  if (companiesError) {
    return <Error message="Failed to load your companies." />;
  }

  const companies = companyData?.companies || [];

  return (
    <section className="mx-auto max-w-4xl py-10">
      <div>
        <Link to="/employer/jobs" className="btn btn-ghost btn-sm mb-6">
          Back to My Jobs
        </Link>

        <h1 className="text-3xl font-bold">Post a Job</h1>

        <p className="mt-2 text-base-content/60">
          Create a new job posting for one of your companies.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="mt-8 rounded-box border border-base-300 p-8 text-center">
          <h2 className="text-xl font-semibold">
            You don't have any companies
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Create a company before posting a job.
          </p>

          <Link to="/employer/companies" className="btn btn-neutral mt-5">
            Create Company
          </Link>
        </div>
      ) : (
        <PostJobForm />
      )}
    </section>
  );
};

export default PostJobPage;
