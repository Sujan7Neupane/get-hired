import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import type { CreateJobData, CreateJobRequest } from "../types/job";

import {
  useCreateJobMutation,
  useGetEmployerCompaniesQuery,
  useUpdateJobMutation,
} from "../redux/slices/jobApiSlice";

import Loading from "./ui/Loading";
import Error from "./ui/Error";
import Input from "./ui/Input";
import Dropdown from "./ui/Dropdown";
import { useEffect } from "react";

type PostJobFormData = {
  companyId: string;

  title: string;
  description: string;

  city: string;
  province: string;
  country: string;
  postalCode: string;

  employmentType: CreateJobData["employmentType"];

  salaryMin: string;
  salaryMax: string;
  currency: string;

  skills: string;

  experienceLevel: CreateJobData["experienceLevel"];

  expiresAt: string;
};

interface PostJobFormProps {
  mode?: "create" | "edit";
  job?: any;
  jobId?: string;
}

const PostJobForm = ({ mode = "create", job, jobId }: PostJobFormProps) => {
  const navigate = useNavigate();

  const [createJob, { isLoading: creatingJob }] = useCreateJobMutation();
  const [updateJob, { isLoading: updatingJob }] = useUpdateJobMutation();

  const {
    data: companyData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useGetEmployerCompaniesQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostJobFormData>({
    defaultValues: {
      companyId: "",
      employmentType: "full-time",
      experienceLevel: "entry",
      currency: "CAD",
    },
  });

  useEffect(() => {
    if (mode === "edit" && job) {
      setValue("companyId", job.company._id);
      setValue("title", job.title);
      setValue("description", job.description);

      setValue("city", job.location.city);
      setValue("province", job.location.province || "");
      setValue("country", job.location.country);
      setValue("postalCode", job.location.postalCode?.toString() || "");

      setValue("employmentType", job.employmentType);

      setValue("salaryMin", job.salary?.min?.toString() || "");

      setValue("salaryMax", job.salary?.max?.toString() || "");

      setValue("currency", job.salary?.currency || "CAD");

      setValue("skills", job.skills.join(", "));

      setValue("experienceLevel", job.experienceLevel);

      setValue(
        "expiresAt",
        job.expiresAt
          ? new Date(job.expiresAt).toISOString().split("T")[0]
          : "",
      );
    }
  }, [mode, job, setValue]);

  if (companiesLoading) {
    return <Loading />;
  }

  if (companiesError) {
    return <Error message="Failed to load your companies." />;
  }

  const companies = companyData?.companies || [];

  const onSubmit = async (data: PostJobFormData) => {
    try {
      const jobData: CreateJobRequest = {
        companyId: data.companyId,

        job: {
          title: data.title,
          description: data.description,

          location: {
            city: data.city,
            province: data.province || undefined,
            country: data.country,
            postalCode: data.postalCode ? Number(data.postalCode) : undefined,
          },

          employmentType: data.employmentType,

          salary: {
            min: data.salaryMin ? Number(data.salaryMin) : undefined,

            max: data.salaryMax ? Number(data.salaryMax) : undefined,

            currency: data.currency,
          },

          skills: data.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),

          experienceLevel: data.experienceLevel,

          expiresAt: data.expiresAt,
        },
      };

      if (mode === "edit" && jobId) {
        await updateJob({
          jobId,
          job: jobData.job,
        }).unwrap();

        toast.success("Job updated successfully.");
      } else {
        await createJob(jobData).unwrap();

        toast.success("Job posted successfully.");
      }

      navigate("/employer/jobs");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post job.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
      <div className="rounded-box border border-base-300 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <div className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Company</label>

            {mode === "edit" ? (
              <Input value={job?.company?.name || ""} readOnly />
            ) : (
              <Dropdown
                value={watch("companyId")}
                onChange={(value) =>
                  setValue("companyId", value, {
                    shouldValidate: true,
                  })
                }
                placeholder="Select a company"
                options={companies.map((company) => ({
                  label: company.name,
                  value: company._id,
                }))}
              />
            )}

            {errors.companyId && (
              <p className="mt-1 text-sm text-error">
                {errors.companyId.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Job Title</label>

            <Input
              {...register("title", {
                required: "Job title is required.",
              })}
              type="text"
              placeholder="e.g. Full Stack Developer"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-error">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Job Description
            </label>

            <textarea
              {...register("description", {
                required: "Description is required.",
              })}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="min-h-40 w-full resize-y border-2 border-gray-200 bg-transparent px-2 py-3 outline-none transition focus:border-primary"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-error">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Location</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">City</label>

            <Input
              {...register("city", {
                required: "City is required.",
              })}
              type="text"
              placeholder="e.g. Toronto"
            />

            {errors.city && (
              <p className="mt-1 text-sm text-error">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Province</label>

            <Input
              {...register("province")}
              type="text"
              placeholder="e.g. Ontario"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Country</label>

            <Input
              {...register("country", {
                required: "Country is required.",
              })}
              type="text"
              placeholder="e.g. Canada"
            />

            {errors.country && (
              <p className="mt-1 text-sm text-error">
                {errors.country.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Postal Code
            </label>

            <Input
              {...register("postalCode")}
              type="number"
              placeholder="e.g. 44600"
            />
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Job Details</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Employment Type
            </label>

            <Dropdown
              value={watch("employmentType")}
              onChange={(value) =>
                setValue(
                  "employmentType",
                  value as CreateJobData["employmentType"],
                  {
                    shouldValidate: true,
                  },
                )
              }
              placeholder="Select employment type"
              options={[
                { label: "Full-time", value: "full-time" },
                { label: "Part-time", value: "part-time" },
                { label: "Contract", value: "contract" },
                { label: "Internship", value: "internship" },
              ]}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Experience Level
            </label>

            <Dropdown
              value={watch("experienceLevel")}
              onChange={(value) =>
                setValue(
                  "experienceLevel",
                  value as CreateJobData["experienceLevel"],
                  {
                    shouldValidate: true,
                  },
                )
              }
              placeholder="Select experience level"
              options={[
                { label: "Entry", value: "entry" },
                { label: "Junior", value: "junior" },
                { label: "Mid", value: "mid" },
                { label: "Senior", value: "senior" },
              ]}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Skills</label>

            <Input
              {...register("skills")}
              type="text"
              placeholder="React, Node.js, MongoDB, TypeScript"
            />

            <p className="mt-2 text-sm text-base-content/50">
              Separate each skill with a comma.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Salary</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Minimum Salary
            </label>

            <Input
              {...register("salaryMin")}
              type="number"
              placeholder="e.g. 60000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Maximum Salary
            </label>

            <Input
              {...register("salaryMax")}
              type="number"
              placeholder="e.g. 80000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Currency</label>

            <Input
              {...register("currency", {
                required: "Currency is required.",
              })}
              type="text"
              placeholder="e.g. CAD"
            />

            {errors.currency && (
              <p className="mt-1 text-sm text-error">
                {errors.currency.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Application Deadline</h2>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Application Deadline
          </label>

          <Input
            {...register("expiresAt", {
              required: "Application deadline is required.",
            })}
            type="date"
          />

          {errors.expiresAt && (
            <p className="mt-1 text-sm text-error">
              {errors.expiresAt.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link to="/employer/jobs" className="btn btn-ghost">
          Cancel
        </Link>

        <button
          type="submit"
          disabled={creatingJob || updatingJob}
          className="btn btn-neutral"
        >
          {creatingJob || updatingJob
            ? mode === "edit"
              ? "Updating..."
              : "Posting..."
            : mode === "edit"
              ? "Update Job"
              : "Post Job"}
        </button>
      </div>
    </form>
  );
};

export default PostJobForm;
