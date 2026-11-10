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

  useEffect(() => { fetchData(); }, []);

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

  const toast = (msg, icon = "success") =>
    Swal.fire({ toast: true, position: "top-end", icon, title: msg, showConfirmButton: false, timer: 2500 });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
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
      setRequests((prev) => prev.map((r) => r._id === requestId ? { ...r, status: "approved" } : r));
      toast("Request approved & role updated!");
    } catch (err) {
      console.error(err);
      toast("Failed to approve request", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfFirst = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfFirst + usersPerPage);
  const getUserRequest = (uid) => requests.find((r) => r.userId === uid);

  const roleBadge = (role) => {
    if (role === "admin") return "bg-rose-50 text-rose-700 ring-rose-200";
    if (role === "tutor") return "bg-amber-50 text-amber-700 ring-amber-200";
    return "bg-indigo-50 text-indigo-700 ring-indigo-200";
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-5">All Users</h2>

      {users.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["#", "Name", "Email", "Role", "Upgrade Request", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentUsers.map((user, idx) => {
                  const userRequest = getUserRequest(user._id);
                  return (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 text-xs">{indexOfFirst + idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{user.name || "N/A"}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{user.email || "N/A"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role || "student"}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2.5 py-1 ring-1 border-0 cursor-pointer focus:outline-none ${roleBadge(user.role)}`}
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {userRequest ? (
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                              userRequest.status === "approved"
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                : "bg-amber-50 text-amber-700 ring-amber-200"
                            }`}>
                              {userRequest.status}
                            </span>
                            {userRequest.status === "pending" && (
                              <button
                                onClick={() => approveRequest(userRequest._id, user._id)}
                                className="text-xs font-semibold text-white bg-indigo-600 px-2.5 py-1 rounded-full hover:bg-indigo-700 transition"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-xs font-semibold text-red-600 bg-red-50 ring-1 ring-red-200 px-3 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition"
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

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium rounded-xl ring-1 ring-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 text-sm font-semibold rounded-xl transition ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "ring-1 ring-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-xl ring-1 ring-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
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
