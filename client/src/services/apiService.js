import api from "./api.js";

// Create authenticated API instance for admin
const createAuthenticatedRequest = () => {
  const token = localStorage.getItem("adminToken");
  return {
    ...api.defaults,
    headers: {
      ...api.defaults.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Main API service with authentication
export const apiService = {
  // Generic authenticated requests
  get: async (url, config = {}) => {
    const authConfig = createAuthenticatedRequest();
    return api.get(url, {
      ...config,
      headers: { ...authConfig.headers, ...config.headers },
    });
  },

  post: async (url, data, config = {}) => {
    const authConfig = createAuthenticatedRequest();
    return api.post(url, data, {
      ...config,
      headers: { ...authConfig.headers, ...config.headers },
    });
  },

  put: async (url, data, config = {}) => {
    const authConfig = createAuthenticatedRequest();
    return api.put(url, data, {
      ...config,
      headers: { ...authConfig.headers, ...config.headers },
    });
  },

  patch: async (url, data, config = {}) => {
    const authConfig = createAuthenticatedRequest();
    return api.patch(url, data, {
      ...config,
      headers: { ...authConfig.headers, ...config.headers },
    });
  },

  delete: async (url, config = {}) => {
    const authConfig = createAuthenticatedRequest();
    return api.delete(url, {
      ...config,
      headers: { ...authConfig.headers, ...config.headers },
    });
  },
};

// News API calls (public only)
export const newsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/news", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
};

// Gallery API calls (public only)
export const galleryAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/gallery", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },
};

// Contact API calls (public submission only)
export const contactAPI = {
  submit: async (contactData) => {
    const response = await api.post("/contact", contactData);
    return response.data;
  },
};

// Pages API calls (public only)
export const pagesAPI = {
  getPage: async (pageId) => {
    const response = await api.get(`/pages/${pageId}`);
    return response.data;
  },
};

// Default export for backward compatibility
export default apiService;
