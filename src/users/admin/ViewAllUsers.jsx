import React, { useEffect, useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import { Users, Search, Trash2, Check, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

const ViewAllUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const toast = (msg, icon = "success") =>
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title: msg,
      showConfirmButton: false,
      timer: 2500,
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
    });

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, requestsRes] = await Promise.all([
        axios.get("/users"),
        axios.get("/admin/upgrade-requests"),
      ]);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : []);
    } catch (err) {
      console.error(err);
      toast("Failed to load platform users", "error");
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      toast("User role updated successfully!");
    } catch (err) {
      console.error(err);
      toast("Failed to update user role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: "Delete user account?",
      text: "This action will permanently delete this user and revoke all permissions.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, delete account",
      cancelButtonText: "Cancel",
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
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
      toast("Request approved & user promoted to Mentor!");
    } catch (err) {
      console.error(err);
      toast("Failed to approve upgrade request", "error");
    }
  };

  // Filter and search users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = name.includes(query) || email.includes(query);

      const normalizedRole = (u.role || "student").toLowerCase();
      const matchesRole =
        roleFilter === "all" || normalizedRole === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const indexOfFirst = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirst,
    indexOfFirst + usersPerPage
  );

  const getUserRequest = (uid) => requests.find((r) => r.userId === uid);

  const roleBadgeStyle = (role) => {
    const r = (role || "").toLowerCase();
    if (r === "admin")
      return "bg-studify-danger/10 text-studify-danger border-studify-danger/30";
    if (r === "tutor")
      return "bg-studify-warning/10 text-studify-warning border-studify-warning/30";
    return "bg-studify-primary/10 text-studify-primary border-studify-primary/30";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Oversee user accounts, assign roles, inspect upgrade requests, and revoke access."
      />

      {/* Filter and Search Bar */}
      <div className="bg-studify-surface p-4 rounded-2xl border border-studify-border shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-studify-muted"
          />
          <input
            type="text"
            placeholder="Search by name or email address..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-studify-border bg-studify-surface text-studify-heading focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-studify-muted uppercase tracking-wider whitespace-nowrap">
            Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-studify-border bg-studify-surface text-studify-heading focus:outline-none focus:ring-2 focus:ring-studify-primary/40 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="tutor">Mentor (Tutor)</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={5} type="table" />
      ) : filteredUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users match your filter"
          description="Try adjusting your search criteria or role filters to view accounts."
        />
      ) : (
        <>
          <div className="bg-studify-surface rounded-2xl border border-studify-border shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-studify-bg/60 border-b border-studify-border">
                  <tr>
                    <th className="px-4 py-3.5 text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      User Profile
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      Assigned Role
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      Upgrade Request
                    </th>
                    <th className="px-4 py-3.5 text-right text-xs font-semibold text-studify-muted uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-studify-border/60">
                  {currentUsers.map((user, idx) => {
                    const userRequest = getUserRequest(user._id);
                    return (
                      <tr
                        key={user._id}
                        className="hover:bg-studify-bg/30 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-studify-muted text-xs font-mono">
                          {indexOfFirst + idx + 1}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-studify-heading">
                          {user.name || "N/A"}
                        </td>
                        <td className="px-4 py-3.5 text-studify-muted font-mono text-xs">
                          {user.email || "N/A"}
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={user.role || "student"}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer focus:outline-none ${roleBadgeStyle(
                              user.role
                            )}`}
                          >
                            <option value="student">Student</option>
                            <option value="tutor">Mentor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5">
                          {userRequest ? (
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                                  userRequest.status === "approved"
                                    ? "bg-studify-success/10 text-studify-success border-studify-success/30"
                                    : "bg-studify-warning/10 text-studify-warning border-studify-warning/30"
                                }`}
                              >
                                {userRequest.status}
                              </span>
                              {userRequest.status === "pending" && (
                                <button
                                  onClick={() =>
                                    approveRequest(userRequest._id, user._id)
                                  }
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-studify-primary px-2.5 py-1 rounded-lg hover:bg-studify-primary-dark transition-colors shadow-xs"
                                >
                                  <Check size={12} />
                                  <span>Approve</span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-studify-muted/50">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-studify-danger bg-studify-danger/10 hover:bg-studify-danger hover:text-white border border-studify-danger/20 px-3 py-1.5 rounded-xl transition-colors"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-studify-muted">
                Showing {indexOfFirst + 1} to{" "}
                {Math.min(indexOfFirst + usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-xs font-medium rounded-xl border border-studify-border text-studify-heading hover:bg-studify-bg disabled:opacity-40 transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 text-xs font-bold rounded-xl transition-colors ${
                      currentPage === i + 1
                        ? "bg-studify-primary text-white shadow-xs"
                        : "border border-studify-border text-studify-heading hover:bg-studify-bg"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-xs font-medium rounded-xl border border-studify-border text-studify-heading hover:bg-studify-bg disabled:opacity-40 transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewAllUsers;
