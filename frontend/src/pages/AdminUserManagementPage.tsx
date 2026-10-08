import {
  useGetUsersQuery,
  useChangeUserStatusMutation,
} from "../redux/slices/adminApiSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const AdminUserManagementPage = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  const [changeUserStatus, { isLoading: isChangingStatus }] =
    useChangeUserStatusMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Failed to load users." />;
  }

  const users = data?.users || [];

  const handleChangeStatus = async (userId: string) => {
    try {
      await changeUserStatus(userId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto max-w-7xl py-10">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>

        <p className="mt-2 text-base-content/60">
          Manage users registered on the platform.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
        {users.length === 0 ? (
          <div className="p-6 text-center text-sm text-base-content/60">
            No users found.
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hidden sm:table-cell">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="hidden md:table-cell">Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="font-medium">{user.fullName}</div>

                    <div className="mt-1 break-all text-sm text-base-content/60 sm:hidden">
                      {user.email}
                    </div>
                  </td>

                  <td className="hidden sm:table-cell">{user.email}</td>

                  <td>
                    <span className="badge badge-outline capitalize">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        user.isActive ? "badge-success" : "badge-error"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      disabled={isChangingStatus}
                      onClick={() => handleChangeStatus(user._id)}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminUserManagementPage;
