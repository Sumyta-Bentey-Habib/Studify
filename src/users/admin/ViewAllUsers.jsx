import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ViewAllUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
        setMessage(res.data.length === 0 ? "No users found." : "");
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setMessage("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axios]);

  if (loading) return <p>Loading users...</p>;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Slice users for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-purple-800">All Users</h2>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("Failed") ? "text-red-600" : "text-gray-700"
          }`}
        >
          {message}
        </p>
      )}

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
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-purple-50">
                    <td>{indexOfFirstUser + idx + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email || "N/A"}</td>
                    <td className="capitalize">{user.role || "student"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center mt-6 space-x-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline btn-primary"
            >
              Previous
            </button>

            {/* Show page numbers */}
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
