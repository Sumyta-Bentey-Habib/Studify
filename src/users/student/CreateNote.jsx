import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../contexts/authcontext/AuthProvider';

const CreateNote = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage('You must be logged in to create a note.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage('Title and content are required.');
      return;
    }

    try {
      const payload = {
        userEmail: user.email,
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
      };

      const response = await axios.post('/notes', payload);

      if (response.data.insertedId) {
        setMessage('Note created successfully!');
        setTitle('');
        setContent('');
      } else {
        setMessage('Failed to create note.');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      setMessage('Error creating note.');
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Create Note</h2>

      {message && (
        <p className={`mb-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter note title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={5}
            placeholder="Write your note here..."
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
