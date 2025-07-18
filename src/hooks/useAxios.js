import axios from 'axios';
import { getAuth } from 'firebase/auth';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'https://studify-server-site.vercel.app', 
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

export default useAxios;
