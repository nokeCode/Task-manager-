<template>
  <form @submit.prevent="submitTask" class="task-form">
    <h3>Nouvelle Tâche</h3>
    
    <div class="form-group">
      <input 
        v-model="task.title" 
        placeholder="Titre de la tâche *"
        required
      />
    </div>

    <div class="form-group">
      <textarea 
        v-model="task.description" 
        placeholder="Description détaillée"
        rows="3"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Priorité</label>
        <select v-model="task.priority">
          <option :value="1">1 - Basse</option>
          <option :value="2">2</option>
          <option :value="3">3 - Moyenne</option>
          <option :value="4">4</option>
          <option :value="5">5 - Haute</option>
        </select>
      </div>

      <div class="form-group">
        <label>Date d'échéance</label>
        <input type="datetime-local" v-model="task.due_date" />
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Création...' : 'Créer la tâche' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const emit = defineEmits(['task-created'])
const taskStore = useTaskStore()
const isSubmitting = ref(false)

const task = ref({
  title: '',
  description: '',
  priority: 3,
  status: 'todo',
  due_date: null
})

const submitTask = async () => {
  isSubmitting.value = true
  try {
    await taskStore.addTask(task.value)
    task.value = { title: '', description: '', priority: 3, status: 'todo', due_date: null }
    emit('task-created')
  } catch (err) {
    alert('Erreur lors de la création: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.task-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b983;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  text-align: right;
}

.btn-primary {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #3aa876;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>