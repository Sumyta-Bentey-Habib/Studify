// src/api/secureApi.js
import axios from 'axios';
import { auth } from '../firebase/firebase.init'; 

export const callSecureApi = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Not authenticated');
  }

  // Get fresh ID token
  const idToken = await user.getIdToken();

  // Make secure API call
  const response = await axios.get('http://localhost:3000/api/secure-data', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
};
