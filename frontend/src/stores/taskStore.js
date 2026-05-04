import { defineStore } from 'pinia'
import api from '../api/api'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    filter: 'all'
  }),

  getters: {
    filteredTasks: (state) => {
      if (state.filter === 'all') return state.tasks
      return state.tasks.filter(t => t.status === state.filter)
    },
    tasksByStatus: (state) => (status) => {
      return state.tasks.filter(t => t.status === status)
    },
    stats: (state) => ({
      active:     state.tasks.filter(t => t.status !== 'done' && t.status !== 'cancelled').length,
      inProgress: state.tasks.filter(t => t.status === 'in_progress').length,
      completed:  state.tasks.filter(t => t.status === 'done').length,
      draft:      state.tasks.filter(t => t.status === 'todo').length,
    })
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await api.getTasks()
        this.tasks = response.data
      } catch (err) {
        this.error = err.message
        // Données de démo si l'API n'est pas dispo
        this.tasks = demoTasks
      } finally {
        this.loading = false
      }
    },

    async addTask(task) {
      const response = await api.createTask(task)
      this.tasks.unshift(response.data)
      return response.data
    },

    async updateTask(id, updates) {
      const response = await api.updateTask(id, updates)
      const index = this.tasks.findIndex(t => t.id === id)
      if (index !== -1) this.tasks[index] = response.data
      return response.data
    },

    async deleteTask(id) {
      await api.deleteTask(id)
      this.tasks = this.tasks.filter(t => t.id !== id)
    },

    async changeStatus(id, status) {
      await api.changeStatus(id, status)
      const task = this.tasks.find(t => t.id === id)
      if (task) task.status = status
    }
  }
})

// Données de démo (fallback si Django n'est pas lancé)
const demoTasks = [
  { id: 1, title: 'Collaborative Brain…', status: 'in_progress', priority: 4, assignee_name: 'Sarah', project_name: 'Project Zenithal', due_date: '2026-09-15' },
  { id: 2, title: 'Core Platform API',    status: 'in_progress', priority: 5, assignee_name: 'Mike',  project_name: 'Project SkyLink',  due_date: '2026-09-15' },
  { id: 3, title: 'Design Refresh',       status: 'done',        priority: 3, assignee_name: 'Fatima',project_name: 'Project Zenithal', due_date: '2026-09-20' },
  { id: 4, title: 'Bluefin Analysis',     status: 'todo',        priority: 2, assignee_name: 'Chen',  project_name: 'Project SkyLink',  due_date: '2026-09-25' },
  { id: 5, title: 'Design Refresh v2',    status: 'done',        priority: 3, assignee_name: 'Fatima',project_name: 'Project Zenithal', due_date: '2026-09-30' },
  { id: 6, title: 'Bluefin Analysis v2',  status: 'todo',        priority: 2, assignee_name: 'Chen',  project_name: 'Project SkyLink',  due_date: '2026-09-25' },
]
