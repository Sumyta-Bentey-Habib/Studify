import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../contexts/authcontext/AuthProvider';

const ViewNotes = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.email) {
      setMessage('You must be logged in to view your notes.');
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/notes?userEmail=${encodeURIComponent(user.email)}`);
        setNotes(res.data);
        setMessage(res.data.length === 0 ? 'No notes found.' : '');
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        setMessage('Failed to load notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [axios, user]);

  if (loading) return <p>Loading notes...</p>;

  if (!user?.email)
    return <p className="text-red-600">Please log in to view your notes.</p>;

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">My Notes</h2>

      {message && <p className={`mb-4 ${message.includes('Failed') ? 'text-red-600' : 'text-gray-700'}`}>{message}</p>}

      {notes.length > 0 && (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id || note.insertedId}
              className="p-4 border rounded shadow bg-purple-50 dark:bg-purple-900"
            >
              <h3 className="font-semibold text-purple-700 dark:text-purple-300">{note.title}</h3>
              <p className="mt-2 whitespace-pre-wrap">{note.content}</p>
              <small className="block mt-2 text-gray-500">
                Created at: {new Date(note.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewNotes;
