<template>
  <div :class="['task-card', `status-${task.status}`]">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <span :class="['badge', task.status]">{{ statusLabel }}</span>
    </div>
    
    <p class="description">{{ task.description || 'Aucune description' }}</p>
    
    <div class="task-meta">
      <span>Priorité: {{ priorityStars }}</span>
      <span>{{ formatDate(task.created_at) }}</span>
    </div>

    <div class="actions">
      <select 
        :value="task.status" 
        @change="$emit('status-change', { id: task.id, status: $event.target.value })"
        class="status-select"
      >
        <option value="todo">À faire</option>
        <option value="in_progress">En cours</option>
        <option value="done">Terminé</option>
        <option value="cancelled">Annulé</option>
      </select>
      
      <button @click="isEditing = true" class="btn-edit">✏️</button>
      <button @click="$emit('delete', task.id)" class="btn-delete">🗑️</button>
    </div>

    <!-- Modal d'édition -->
    <div v-if="isEditing" class="modal" @click.self="isEditing = false">
      <div class="modal-content">
        <h3>Modifier la tâche</h3>
        <input v-model="editTask.title" placeholder="Titre" />
        <textarea v-model="editTask.description" placeholder="Description" />
        <select v-model="editTask.priority">
          <option :value="1">Priorité 1</option>
          <option :value="2">Priorité 2</option>
          <option :value="3">Priorité 3</option>
          <option :value="4">Priorité 4</option>
          <option :value="5">Priorité 5</option>
        </select>
        <div class="modal-actions">
          <button @click="saveEdit" class="btn-primary">Sauvegarder</button>
          <button @click="isEditing = false">Annuler</button>
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
  'todo': 'À faire',
  'in_progress': 'En cours',
  'done': 'Terminé',
  'cancelled': 'Annulé'
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
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #ddd;
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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