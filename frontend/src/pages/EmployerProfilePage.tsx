import { useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useUserInfoQuery } from "../redux/slices/authApiSlice";
import { useUpdateEmployerProfileMutation } from "../redux/slices/userApiSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface ProfileFormData {
  fullName: string;
  profileImage?: FileList;
}

const EmployerProfilePage = () => {
  const { data, isLoading, error } = useUserInfoQuery();

  const [updateEmployerProfile, { isLoading: isUpdating }] =
    useUpdateEmployerProfileMutation();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.user) {
    return <Error message="Failed to load profile." />;
  }

  const user = data.user;

  const handleEdit = () => {
    setValue("fullName", user.fullName);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const body = new FormData();

      body.append("fullName", formData.fullName.trim());

      if (formData.profileImage?.[0]) {
        body.append("profileImage", formData.profileImage[0]);
      }

      await updateEmployerProfile(body).unwrap();

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-1 text-base-content/60">
          Manage your employer account information.
        </p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-base-200">
              <FaUser className="text-3xl text-base-content/50" />
            </div>
          )}

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>

            <p className="mt-1 text-base-content/60">{user.email}</p>

            <span className="badge badge-neutral mt-3 capitalize">
              {user.role}
            </span>
          </div>
        </div>

        <div className="divider" />

        {!isEditing ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-base-content/50">Full Name</p>

                <p className="mt-1 font-medium">{user.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Email</p>

                <p className="mt-1 font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Role</p>

                <p className="mt-1 font-medium capitalize">{user.role}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">Account Status</p>

                <span
                  className={`badge mt-1 ${
                    user.isActive ? "badge-success" : "badge-error"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <button onClick={handleEdit} className="btn btn-neutral mt-8">
              <FaEdit />
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-semibold">Edit Profile</h3>

            <div className="mt-5">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <Input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
              />

              {errors.fullName && (
                <p className="mt-1 text-sm text-error">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("profileImage")}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                type="submit"
                disabled={isUpdating}
                className="btn btn-neutral"
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>

              <Button
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
                className="btn btn-outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmployerProfilePage;
