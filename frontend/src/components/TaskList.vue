<template>
  <div class="task-manager">
    <div class="header">
      <h1>Gestionnaire de Tâches</h1>
      <button @click="showForm = !showForm" class="btn-primary">
        {{ showForm ? 'Annuler' : '+ Nouvelle Tâche' }}
      </button>
    </div>

    <TaskForm v-if="showForm" @task-created="onTaskCreated" />

    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="currentFilter = filter.value"
        :class="{ active: currentFilter === filter.value }"
      >
        {{ filter.label }} ({{ countByFilter(filter.value) }})
      </button>
    </div>

    <div v-if="taskStore.loading" class="loading">Chargement...</div>
    
    <div v-else class="tasks-grid">
      <TaskItem 
        v-for="task in filteredTasks" 
        :key="task.id"
        :task="task"
        @update="updateTask"
        @delete="deleteTask"
        @status-change="changeStatus"
      />
    </div>

    <div v-if="filteredTasks.length === 0" class="empty">
      Aucune tâche trouvée
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from './TaskForm.vue'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()
const showForm = ref(false)
const currentFilter = ref('all')

const filters = [
  { label: 'Toutes', value: 'all' },
  { label: 'À faire', value: 'todo' },
  { label: 'En cours', value: 'in_progress' },
  { label: 'Terminées', value: 'done' }
]

onMounted(() => taskStore.fetchTasks())

const filteredTasks = computed(() => {
  if (currentFilter.value === 'all') return taskStore.tasks
  return taskStore.tasks.filter(t => t.status === currentFilter.value)
})

const countByFilter = (filter) => {
  if (filter === 'all') return taskStore.tasks.length
  return taskStore.tasks.filter(t => t.status === filter).length
}

const onTaskCreated = () => {
  showForm.value = false
  taskStore.fetchTasks()
}

const updateTask = (task) => taskStore.updateTask(task.id, task)
const deleteTask = (id) => {
  if (confirm('Supprimer cette tâche ?')) taskStore.deleteTask(id)
}
const changeStatus = ({ id, status }) => taskStore.changeStatus(id, status)
</script>

<style scoped>
.task-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filters button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filters button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.loading, .empty {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>