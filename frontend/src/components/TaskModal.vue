<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content glass-card">
      <div class="modal-header">
        <h2>Nouvelle Tâche</h2>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>
      
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label>Titre</label>
          <input v-model="task.title" type="text" placeholder="Nom de la tâche..." required />
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="task.description" rows="3" placeholder="Description détaillée..."></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Projet</label>
            <select v-model="task.project">
              <option v-for="proj in projects" :key="proj" :value="proj">{{ proj }}</option>
            </select>
          </div>
          
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
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Date d'échéance</label>
            <input type="date" v-model="task.dueDate" />
          </div>
          
          <div class="form-group">
            <label>Assigné à</label>
            <select v-model="task.assignee">
              <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
            </select>
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Annuler</button>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Création...' : 'Créer la tâche' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const emit = defineEmits(['close'])
const taskStore = useTaskStore()
const isSubmitting = ref(false)

const projects = ['Metacore', 'Blurryspace', 'Core System', 'Metamorphlab']
const users = ['Robertz', 'Kang ngored', 'Abah adum', 'Ngusep gais']

const task = ref({
  title: '',
  description: '',
  project: projects[0],
  priority: 3,
  dueDate: '',
  assignee: users[0],
  status: 'todo'
})

const submitTask = async () => {
  isSubmitting.value = true
  try {
    await taskStore.addTask(task.value)
    emit('close')
  } catch (err) {
    alert('Erreur: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 90, 100, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  padding: 28px;
  animation: slideUp 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  color: var(--color-primary);
  font-size: 1.25rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-secondary);
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close:hover {
  background: rgba(59, 90, 100, 0.1);
  color: var(--color-primary);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(59, 90, 100, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.6);
  color: var(--color-primary);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 90, 100, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(59, 90, 100, 0.1);
}

.btn-secondary {
  padding: 12px 24px;
  border: 1px solid rgba(59, 90, 100, 0.2);
  background: transparent;
  color: var(--color-secondary);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-primary {
  padding: 12px 24px;
  border: none;
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 90, 100, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 90, 100, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>