import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default {
  getTasks: () => api.get('/tasks/'),
  getTask: (id) => api.get(`/tasks/${id}/`),
  createTask: (data) => api.post('/tasks/', data),
  updateTask: (id, data) => api.put(`/tasks/${id}/`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
  changeStatus: (id, status) => api.post(`/tasks/${id}/change_status/`, { status }),
  getByStatus: (status) => api.get(`/tasks/by_status/?status=${status}`)
}

export { api }