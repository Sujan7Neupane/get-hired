import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaFilePdf, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

import { useUserInfoQuery } from "../redux/slices/authApiSlice";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useUpdateProfileMutation } from "../redux/slices/userApiSlice";

const ProfilePage = () => {
  const { user: authUser } = useSelector((state: any) => state.auth);

  const {
    data: userResponse,
    isLoading,
    isError,
  } = useUserInfoQuery(undefined);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const user = userResponse?.user || authUser;

  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setSkills(user.skills?.join(", ") || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("skills", skills);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (resume) {
        formData.append("resume", resume);
      }

      const response = await updateProfile(formData).unwrap();

      toast.success(response.message);

      setProfileImage(null);
      setResume(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.error ||
          "Failed to update profile.",
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return <Error message="Failed to load your profile." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your personal information and resume.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center">
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUser className="text-5xl text-gray-400" />
            )}
          </div>

          <label className="btn btn-outline mt-4 cursor-pointer">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            />
          </label>

          {profileImage && (
            <p className="mt-2 max-w-40 truncate text-xs text-gray-500">
              {profileImage.name}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <Input
              type="email"
              value={user.email}
              disabled
              className="cursor-not-allowed opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Role</label>

            <Input
              type="text"
              value={user.role}
              disabled
              className="cursor-not-allowed capitalize opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Skills</label>

            <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />

            <p className="mt-1 text-xs text-gray-500">
              Separate skills with commas.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Resume</label>

            {user.resume && (
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <FaFilePdf />
                View current resume
              </a>
            )}

            <input
              type="file"
              accept=".pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />

            {resume && (
              <p className="mt-2 text-xs text-gray-500">
                Selected: {resume.name}
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
