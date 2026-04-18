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
    }
  },
  
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await api.getTasks()
        this.tasks = response.data
      } catch (err) {
        this.error = err.message
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