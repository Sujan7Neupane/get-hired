import { Link, useParams } from "react-router";
import { useGetEmployerJobByIdQuery } from "../redux/slices/jobApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import PostJobForm from "../components/PostJobForm";

const EditJobPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetEmployerJobByIdQuery(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.job) {
    return <Error message="Failed to load job." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        to="/employer/jobs"
        className="mb-6 inline-block text-sm font-medium hover:underline"
      >
        ← Back to My Jobs
      </Link>

      <h1 className="text-3xl font-bold">Edit Job</h1>

      <PostJobForm mode="edit" job={data.job} jobId={id} />
    </div>
  );
};

export default EditJobPage;
