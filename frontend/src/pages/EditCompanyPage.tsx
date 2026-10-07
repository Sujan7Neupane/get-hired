import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "../redux/slices/companyApiSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface CompanyFormData {
  name: string;
  description: string;
  industry: string;
  website: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  logo: FileList;
}

const EditCompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCompanyByIdQuery(id!);

  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>();

  useEffect(() => {
    if (data?.company) {
      const company = data.company;

      reset({
        name: company.name,
        description: company.description,
        industry: company.industry,
        website: company.website || "",
        city: company.location.city,
        province: company.location.province || "",
        country: company.location.country,
        postalCode: company.location.postalCode
          ? String(company.location.postalCode)
          : "",
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.company) {
    return <Error message="Failed to load company." />;
  }

  const onSubmit = async (formValues: CompanyFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("industry", formValues.industry);
      formData.append("website", formValues.website);

      const location = {
        city: formValues.city,
        province: formValues.province,
        country: formValues.country,
        ...(formValues.postalCode && {
          postalCode: Number(formValues.postalCode),
        }),
      };

      formData.append("location", JSON.stringify(location));

      if (formValues.logo?.[0]) {
        formData.append("logo", formValues.logo[0]);
      }

      await updateCompany({
        companyId: id!,
        formData,
      }).unwrap();

      toast.success("Company updated successfully");

      navigate(`/employer/companies/${id}`);
    } catch (error) {
      toast.error("Failed to update company");
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Company</h1>

        <p className="mt-1 text-base-content/60">
          Update your company information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-box border border-base-300 bg-base-100 p-6"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>

          <Input
            type="text"
            className="input input-bordered w-full"
            {...register("name", {
              required: "Company name is required",
            })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-error">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control mt-5">
          <label className="label">
            <span className="label-text">Industry</span>
          </label>

          <Input
            type="text"
            className="input input-bordered w-full"
            {...register("industry", {
              required: "Industry is required",
            })}
          />

          {errors.industry && (
            <p className="mt-1 text-sm text-error">{errors.industry.message}</p>
          )}
        </div>

        <div className="form-control mt-5">
          <label className="label">
            <span className="label-text">Description</span>
          </label>

          <textarea
            className="textarea textarea-bordered min-h-32 w-full border border-gray-300 rounded-sm"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-error">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="form-control mt-5">
          <label className="label">
            <span className="label-text">Website</span>
          </label>

          <Input
            type="url"
            className="input input-bordered w-full"
            {...register("website")}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Location</h2>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>

              <Input
                type="text"
                className="input input-bordered w-full"
                {...register("city", {
                  required: "City is required",
                })}
              />

              {errors.city && (
                <p className="mt-1 text-sm text-error">{errors.city.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Province</span>
              </label>

              <Input
                type="text"
                className="input input-bordered w-full"
                {...register("province")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>

              <Input
                type="text"
                className="input input-bordered w-full"
                {...register("country", {
                  required: "Country is required",
                })}
              />

              {errors.country && (
                <p className="mt-1 text-sm text-error">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>

              <Input
                type="number"
                className="input input-bordered w-full"
                {...register("postalCode")}
              />
            </div>
          </div>
        </div>

        <div className="form-control mt-8">
          <label className="label">
            <span className="label-text">Company Logo</span>
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("logo")}
          />

          <p className="mt-2 text-sm text-base-content/50">
            Leave empty to keep the current logo.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link to={`/employer/companies/${id}`} className="btn btn-ghost">
            Cancel
          </Link>

          <Button
            type="submit"
            disabled={isUpdating}
            className="btn btn-neutral"
          >
            {isUpdating ? "Updating..." : "Update Company"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditCompanyPage;
