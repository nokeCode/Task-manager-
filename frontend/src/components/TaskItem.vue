<template>
  <div :class="['task-card', `status-${task.status}`]">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <span :class="['status-badge', task.status]">{{ statusLabel }}</span>
    </div>
    
    <p class="task-description">{{ task.description || 'No description' }}</p>
    
    <div class="task-meta">
      <div class="priority">
        <span>Priority: </span>
        <span class="stars">{{ priorityStars }}</span>
      </div>
      <div class="due-date">
        <span>Due: </span>
        <span>{{ formatDate(task.due_date || task.created_at) }}</span>
      </div>
    </div>

    <div class="task-actions">
      <select 
        :value="task.status" 
        @change="$emit('status-change', { id: task.id, status: $event.target.value })"
        class="status-select"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>
      
      <button @click="isEditing = true" class="btn btn-secondary">Edit</button>
      <button @click="$emit('delete', task.id)" class="btn btn-danger">Delete</button>
    </div>

    <!-- Edit Modal -->
    <div v-if="isEditing" class="modal" @click.self="isEditing = false">
      <div class="modal-content">
        <h3>Edit Task</h3>
        <input v-model="editTask.title" placeholder="Title" />
        <textarea v-model="editTask.description" placeholder="Description" />
        <select v-model="editTask.priority">
          <option :value="1">Priority 1</option>
          <option :value="2">Priority 2</option>
          <option :value="3">Priority 3</option>
          <option :value="4">Priority 4</option>
          <option :value="5">Priority 5</option>
        </select>
        <div class="modal-actions">
          <button @click="saveEdit" class="btn btn-primary">Save</button>
          <button @click="isEditing = false" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['task'])
const emit = defineEmits(['update', 'delete', 'status-change'])

const isEditing = ref(false)
const editTask = ref({ ...props.task })

const statusLabel = computed(() => ({
  'todo': 'To Do',
  'in_progress': 'In Progress',
  'done': 'Done',
  'cancelled': 'Cancelled'
}[props.task.status]))

const safePriority = computed(() => {
  const count = Number(props.task.priority)
  return Number.isInteger(count) ? Math.max(0, count) : 0
})

const priorityStars = computed(() => {
  const stars = '⭐'.repeat(safePriority.value)
  return stars || 'Aucune'
})

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

const saveEdit = () => {
  emit('update', editTask.value)
  isEditing.value = false
}
</script>

<style scoped>
.task-card {
  background: var(--pure-white);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-smooth);
  border-left: 4px solid var(--secondary-gray);
}

.task-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.task-card.status-todo {
  border-left-color: var(--accent-red);
}

.task-card.status-in_progress {
  border-left-color: var(--accent-yellow);
}

.task-card.status-done {
  border-left-color: var(--accent-green);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.task-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.status-badge {
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.todo {
  background: var(--accent-red);
  color: var(--pure-white);
}

.status-badge.in_progress {
  background: var(--accent-yellow);
  color: var(--text-primary);
}

.status-badge.done {
  background: var(--accent-green);
  color: var(--pure-white);
}

.task-description {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.priority .stars {
  color: #FFD700;
}

.task-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.status-select {
  padding: 6px 12px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--radius-md);
  background: var(--pure-white);
  color: var(--text-primary);
  cursor: pointer;
}

.btn-danger {
  background: var(--accent-red);
  color: var(--pure-white);
}

.btn-danger:hover {
  background: #c0392b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--pure-white);
  border-radius: var(--radius-lg);
  padding: 20px;
  max-width: 500px;
  width: 90%;
}

.modal-content h3 {
  margin-bottom: 16px;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--radius-md);
  font-family: 'Inter', sans-serif;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.status-todo { border-left-color: #ff6b6b; }
.status-in_progress { border-left-color: #ffd93d; }
.status-done { border-left-color: #6bcf7f; }
.status-cancelled { border-left-color: #95a5a6; }

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge.todo { background: #ff6b6b; color: white; }
.badge.in_progress { background: #ffd93d; color: black; }
.badge.done { background: #6bcf7f; color: white; }
.badge.cancelled { background: #95a5a6; color: white; }

.description {
  color: #666;
  margin-bottom: 1rem;
  min-height: 40px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.status-select {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.btn-edit, .btn-delete {
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
}

.btn-edit:hover { background: #e3f2fd; }
.btn-delete:hover { background: #ffebee; }

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal-content textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>