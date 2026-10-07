import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

import {
  useDeleteCompanyMutation,
  useGetCompanyByIdQuery,
} from "../redux/slices/companyApiSlice";

const EmployerCompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCompanyByIdQuery(id!);

  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.company) {
    return <Error message="Failed to load company." />;
  }

  const company = data.company;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${company.name}?`,
    );

    if (!confirmed) return;

    try {
      await deleteCompany(company._id).unwrap();

      toast.success("Company deleted successfully");
      navigate("/employer/companies");
    } catch (error) {
      toast.error("Failed to delete company");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/employer/companies" className="btn btn-ghost mb-6">
        <FaArrowLeft />
        Back to Companies
      </Link>

      <div className="rounded-box border border-base-300 bg-base-100 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-24 w-24 rounded-box object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-box bg-base-200 text-3xl font-bold">
              {company.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{company.name}</h1>

            <p className="mt-2 text-base-content/60">{company.industry}</p>

            <p className="mt-2 text-base-content/60">
              {company.location.city}, {company.location.country}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3 border-t border-base-300 pt-6">
          <Link
            to={`/employer/companies/${company._id}/edit`}
            className="btn btn-neutral"
          >
            <FaEdit />
            Edit Company
          </Link>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-error"
          >
            <FaTrash />

            {isDeleting ? "Deleting..." : "Delete Company"}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-box border border-base-300 bg-base-100 p-6">
        <h2 className="text-xl font-semibold">About the Company</h2>

        <p className="mt-3 whitespace-pre-line leading-7 text-base-content/70">
          {company.description}
        </p>
      </div>

      <div className="mt-6 rounded-box border border-base-300 bg-base-100 p-6">
        <h2 className="text-xl font-semibold">Company Information</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-base-content/50">Industry</p>

            <p className="mt-1 font-medium">{company.industry}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/50">Website</p>

            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block link"
              >
                {company.website}
              </a>
            ) : (
              <p className="mt-1 text-base-content/60">Not provided</p>
            )}
          </div>

          <div>
            <p className="text-sm text-base-content/50">City</p>

            <p className="mt-1 font-medium">{company.location.city}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/50">Province</p>

            <p className="mt-1 font-medium">
              {company.location.province || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/50">Country</p>

            <p className="mt-1 font-medium">{company.location.country}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/50">Postal Code</p>

            <p className="mt-1 font-medium">
              {company.location.postalCode || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerCompanyDetailsPage;
