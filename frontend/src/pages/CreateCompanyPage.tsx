import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCreateCompanyMutation } from "../redux/slices/companyApiSlice";
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

const CreateCompanyPage = () => {
  const navigate = useNavigate();

  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>();

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("industry", data.industry);
      formData.append("website", data.website);

      const location = {
        city: data.city,
        province: data.province,
        country: data.country,
        ...(data.postalCode && {
          postalCode: Number(data.postalCode),
        }),
      };

      formData.append("location", JSON.stringify(location));

      if (data.logo?.[0]) {
        formData.append("logo", data.logo[0]);
      }

      await createCompany(formData).unwrap();

      toast.success("Company created successfully");
      navigate("/employer/companies");
    } catch (error) {
      toast.error("Failed to create company");
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Company</h1>

        <p className="mt-1 text-base-content/60">
          Add your company information to start posting jobs.
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
            placeholder="https://example.com"
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
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/employer/companies")}
            className="btn btn-ghost"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="btn btn-neutral"
          >
            {isLoading ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateCompanyPage;
