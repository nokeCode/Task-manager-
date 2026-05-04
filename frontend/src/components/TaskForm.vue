<template>
  <form @submit.prevent="submitTask" class="task-form">
    <h3>{{ editMode ? 'Edit Task' : 'New Task' }}</h3>
    
    <div class="form-group">
      <input 
        v-model="task.title" 
        placeholder="Task title *"
        required
      />
    </div>

    <div class="form-group">
      <textarea 
        v-model="task.description" 
        placeholder="Detailed description"
        rows="3"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Priority</label>
        <select v-model="task.priority">
          <option :value="1">1 - Low</option>
          <option :value="2">2</option>
          <option :value="3">3 - Medium</option>
          <option :value="4">4</option>
          <option :value="5">5 - High</option>
        </select>
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input type="datetime-local" v-model="task.due_date" />
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : (editMode ? 'Update Task' : 'Create Task') }}
      </button>
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const props = defineProps({
  editTask: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['task-created', 'task-updated', 'cancel'])
const taskStore = useTaskStore()
const isSubmitting = ref(false)

const editMode = ref(!!props.editTask)

const task = ref({
  title: '',
  description: '',
  priority: 3,
  status: 'todo',
  due_date: null
})

watch(() => props.editTask, (newTask) => {
  if (newTask) {
    task.value = { ...newTask }
    editMode.value = true
  } else {
    task.value = { title: '', description: '', priority: 3, status: 'todo', due_date: null }
    editMode.value = false
  }
}, { immediate: true })

const submitTask = async () => {
  isSubmitting.value = true
  try {
    if (editMode.value) {
      await taskStore.updateTask(task.value)
      emit('task-updated')
    } else {
      await taskStore.addTask(task.value)
      emit('task-created')
    }
  } catch (err) {
    alert('Error: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.task-form {
  background: var(--pure-white);
  padding: 20px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.task-form h3 {
  margin-bottom: 20px;
  color: var(--text-primary);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--radius-md);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--text-primary);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

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
