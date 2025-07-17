import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const BookedSession = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const res = await axios.get("/booked-sessions"); 
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookedSessions();
  }, [axios]);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">My Booked Sessions</h2>
      <div className="space-y-4">
        {sessions.length === 0 && <p>No sessions booked yet.</p>}
        {sessions.map((session) => (
          <div
            key={session._id}
            className="p-4 border rounded shadow bg-purple-50 dark:bg-purple-900"
          >
            <h3 className="font-bold text-purple-700 dark:text-purple-300">
              {session.title}
            </h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Tutor: {session.tutorName}
            </p>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Date:{" "}
              {new Date(session.classStartTime).toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedSession;
