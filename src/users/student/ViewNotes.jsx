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

  if (loading)
    return (
      <p className="p-6 text-center text-indigo-700" style={{ backgroundColor: '#F3E8FF' }}>
        Loading notes...
      </p>
    );

  if (!user?.email)
    return (
      <p className="p-6 text-center text-red-600" style={{ backgroundColor: '#F3E8FF' }}>
        Please log in to view your notes.
      </p>
    );

  return (
    <div
      className="max-w-3xl p-6 mx-auto rounded shadow"
      style={{ backgroundColor: '#F3E8FF' }}
    >
      <h2 className="mb-6 text-2xl font-bold text-indigo-900">My Notes</h2>

      {message && (
        <p
          className={`mb-6 ${
            message.includes('Failed') ? 'text-red-600' : 'text-indigo-700'
          }`}
        >
          {message}
        </p>
      )}

      {notes.length > 0 && (
        <ul className="space-y-6">
          {notes.map((note) => (
            <li
              key={note._id || note.insertedId}
              className="p-6 border border-indigo-300 rounded shadow bg-indigo-50"
            >
              <h3 className="font-semibold text-indigo-900">{note.title}</h3>
              <p className="mt-3 text-indigo-800 whitespace-pre-wrap">{note.content}</p>
              <small className="block mt-4 text-indigo-500">
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
