import axios from 'axios';

// Create configured Axios instance
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to all outgoing requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('comiccraft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for uniform response & error formatting
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';

    // If token expired or unauthorized, clear token
    if (error.response?.status === 401) {
      if (localStorage.getItem('comiccraft_token')) {
        localStorage.removeItem('comiccraft_token');
        localStorage.removeItem('comiccraft_user');
      }
    }

    return Promise.reject(new Error(message));
  }
);

/* ==============================================
   AUTHENTICATION APIS
============================================== */
export const register = async (userData) => {
  return await API.post('/auth/register', userData);
};

export const login = async (credentials) => {
  return await API.post('/auth/login', credentials);
};

export const getCurrentUser = async () => {
  return await API.get('/auth/me');
};

/* ==============================================
   COMIC APIS
============================================== */
export const getComics = async (params = {}) => {
  return await API.get('/comics', { params });
};

export const getComic = async (id) => {
  return await API.get(`/comics/${id}`);
};

export const createComic = async (comicData) => {
  return await API.post('/comics', comicData);
};

export const updateComic = async (id, comicData) => {
  return await API.put(`/comics/${id}`, comicData);
};

export const deleteComic = async (id) => {
  return await API.delete(`/comics/${id}`);
};

/* ==============================================
   CHARACTER APIS
============================================== */
export const getCharacters = async () => {
  return await API.get('/characters');
};

export const createCharacter = async (characterData) => {
  return await API.post('/characters', characterData);
};

export const updateCharacter = async (id, characterData) => {
  return await API.put(`/characters/${id}`, characterData);
};

export const deleteCharacter = async (id) => {
  return await API.delete(`/characters/${id}`);
};

/* ==============================================
   PANEL APIS
============================================== */
export const addPanel = async (comicId, panelData) => {
  return await API.post(`/comics/${comicId}/panels`, panelData);
};

export const updatePanel = async (panelId, panelData) => {
  return await API.put(`/panels/${panelId}`, panelData);
};

export const deletePanel = async (panelId) => {
  return await API.delete(`/panels/${panelId}`);
};

/* ==============================================
   PROFILE APIS
============================================== */
export const getProfile = async () => {
  return await API.get('/profile');
};

export const updateProfile = async (profileData) => {
  return await API.put('/profile', profileData);
};

export const updatePassword = async (passwordData) => {
  return await API.put('/profile/password', passwordData);
};

/* ==============================================
   IMAGE UPLOAD API
============================================== */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  return await API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/* ==============================================
   AI & PRESET APIS
============================================== */
export const getPresets = async () => {
  return await API.get('/ai/presets');
};

export const getAiSuggestion = async (genre) => {
  return await API.post('/ai/suggest', { genre });
};

export default API;
