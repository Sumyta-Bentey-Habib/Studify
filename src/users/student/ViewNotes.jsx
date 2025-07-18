import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../contexts/authcontext/AuthProvider';
import Swal from 'sweetalert2';

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
        if (res.data.length === 0) setMessage('No notes found.');
        else setMessage('');
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        setMessage('Failed to load notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [axios, user]);

  const handleDelete = async (noteId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This note will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7C3AED',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: '#F3E8FF',
      color: '#4C1D95',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/notes/${noteId}`);
        setNotes((prev) => prev.filter((note) => (note._id || note.insertedId) !== noteId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          background: '#F3E8FF',
          confirmButtonColor: '#7C3AED',
          color: '#4C1D95',
        });
      } catch (error) {
        console.error('Failed to delete note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete note.',
          background: '#F3E8FF',
          confirmButtonColor: '#7C3AED',
          color: '#4C1D95',
        });
      }
    }
  };

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

      {message && !notes.length && (
        <p className={`mb-6 ${message.includes('Failed') ? 'text-red-600' : 'text-indigo-700'}`}>
          {message}
        </p>
      )}

      {notes.length > 0 && (
        <ul className="space-y-6">
          {notes.map((note) => {
            const noteId = note._id || note.insertedId;
            return (
              <li
                key={noteId}
                className="flex flex-col p-6 border border-indigo-300 rounded shadow bg-indigo-50"
              >
                <h3 className="font-semibold text-indigo-900">{note.title}</h3>
                <p className="mt-3 text-indigo-800 whitespace-pre-wrap">{note.content}</p>
                <small className="block mt-4 text-indigo-500">
                  Created at: {new Date(note.createdAt).toLocaleString()}
                </small>
                <button
                  onClick={() => handleDelete(noteId)}
                  className="self-start px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ViewNotes;
