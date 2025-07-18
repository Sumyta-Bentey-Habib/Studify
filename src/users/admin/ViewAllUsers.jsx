import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const ViewAllUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, requestsRes] = await Promise.all([
        axios.get("/users"),
        axios.get("/admin/upgrade-requests"),
      ]);
      setUsers(usersRes.data);
      setRequests(requestsRes.data);
    } catch (err) {
      console.error(err);
      toast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const toast = (msg, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      toast("Role updated!");
    } catch (err) {
      console.error(err);
      toast("Failed to update role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast("User deleted successfully");
    } catch (err) {
      console.error(err);
      toast("Failed to delete user", "error");
    }
  };

  const approveRequest = async (requestId, userId) => {
    try {
      await axios.post(`/admin/upgrade-requests/${requestId}/approve`);
      await handleRoleChange(userId, "tutor");
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "approved" } : r
        )
      );
      toast("Request approved & role updated!");
    } catch (err) {
      console.error(err);
      toast("Failed to approve request", "error");
    }
  };

  if (loading) return <p>Loading users...</p>;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getUserRequest = (userId) =>
    requests.find((r) => r.userId === userId);

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-purple-800">All Users</h2>

      {users.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full border border-purple-200">
              <thead className="bg-purple-100">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Upgrade Request</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, idx) => {
                  const userRequest = getUserRequest(user._id);
                  return (
                    <tr key={user._id} className="hover:bg-purple-50">
                      <td>{indexOfFirstUser + idx + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email || "N/A"}</td>
                      <td>
                        <select
                          value={user.role || "student"}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="px-2 py-1 border border-purple-300 rounded"
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        {userRequest ? (
                          <div>
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                userRequest.status === "approved"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-yellow-200 text-yellow-800"
                              }`}
                            >
                              {userRequest.status}
                            </span>
                            {userRequest.status === "pending" && (
                              <button
                                onClick={() =>
                                  approveRequest(userRequest._id, user._id)
                                }
                                className="px-2 py-1 ml-2 text-xs text-white bg-purple-600 rounded hover:bg-purple-700"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-6 space-x-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline btn-primary"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline btn-primary"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAllUsers;
