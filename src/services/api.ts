const API_URL = '/api/v1';

export const api = {
  auth: {
    login: async (credentials: any) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }
      return res.json();
    },
    register: async (userData: any) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Registration failed');
      }
      return res.json();
    },
    googleLogin: async (token: string) => {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Google login failed');
      }
      return res.json();
    },
    getMe: async (token: string) => {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
  },
  courses: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/courses`);
      if (!res.ok) throw new Error('Failed to fetch courses');
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/courses/${id}`);
      if (!res.ok) throw new Error('Failed to fetch course');
      return res.json();
    },
  },
  mentor: {
    apply: async (formData: FormData) => {
      const res = await fetch(`${API_URL}/mentor/apply`, {
        method: 'POST',
        // Omit Content-Type to let browser set boundary for multipart/form-data
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Application failed');
      }
      return res.json();
    },
  },
};
