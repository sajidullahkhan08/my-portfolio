import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

// Auth
export const authAPI = {
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

// Blogs
export const blogAPI = {
  getAll: (params) => API.get("/blogs", { params }),
  getBySlug: (slug) => API.get(`/blogs/${slug}`),
  getRelated: (slug) => API.get(`/blogs/${slug}/related`),
  getCategories: () => API.get("/blogs/categories"),
  getTags: () => API.get("/blogs/tags"),
  create: (data) => API.post("/blogs", data),
  update: (id, data) => API.put(`/blogs/${id}`, data),
  delete: (id) => API.delete(`/blogs/${id}`),
};

// Projects
export const projectAPI = {
  getAll: (params) => API.get("/projects", { params }),
  getById: (id) => API.get(`/projects/${id}`),
  getCategories: () => API.get("/projects/categories"),
  create: (data) => API.post("/projects", data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

// Skills
export const skillAPI = {
  getAll: (params) => API.get("/skills", { params }),
  create: (data) => API.post("/skills", data),
  update: (id, data) => API.put(`/skills/${id}`, data),
  delete: (id) => API.delete(`/skills/${id}`),
};

// Experience
export const experienceAPI = {
  getAll: (params) => API.get("/experience", { params }),
  create: (data) => API.post("/experience", data),
  update: (id, data) => API.put(`/experience/${id}`, data),
  delete: (id) => API.delete(`/experience/${id}`),
};

// Testimonials
export const testimonialAPI = {
  getAll: () => API.get("/testimonials"),
  create: (data) => API.post("/testimonials", data),
  update: (id, data) => API.put(`/testimonials/${id}`, data),
  delete: (id) => API.delete(`/testimonials/${id}`),
};

// Media
export const mediaAPI = {
  getAll: (params) => API.get("/media", { params }),
  upload: (formData) =>
    API.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => API.delete(`/media/${id}`),
  getCategories: () => API.get("/media/gallery/categories"),
  getGallery: (params) => API.get("/media/gallery", { params }),
  updateMetadata: (id, data) => API.put(`/media/${id}/metadata`, data),
};

// Config
export const configAPI = {
  getAll: () => API.get("/config"),
  update: (data) => API.put("/config", data),
  updateBulk: (configs) => API.put("/config/bulk", { configs }),
};

// Dashboard
export const dashboardAPI = {
  getStats: () => API.get("/dashboard/stats"),
};

export default API;
