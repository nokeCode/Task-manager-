<template>
  <div class="glass-card task-card">
    <div class="task-toolbar">
      <div class="task-title">Task List</div>
      <div class="filter-btn">⊟ All statuses ▾</div>
      <div class="filter-btn">⊞ All projects ▾</div>
      <div class="card-menu">···</div>
    </div>

    <table class="task-list">
      <thead>
        <tr>
          <th style="width:30px;"></th>
          <th>Collaborator</th>
          <th>Project</th>
          <th>Due date</th>
          <th>Assignee</th>
          <th>Status</th>
          <th>Progress</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td><div class="task-check">✓</div></td>
          <td>
            <div class="task-name-cell">
              <div class="task-icon" :class="task.iconClass">{{ task.emoji }}</div>
              <div>
                <div class="task-name">{{ task.name }}</div>
                <div class="task-proj">{{ task.project }}</div>
              </div>
            </div>
          </td>
          <td>{{ task.project }}</td>
          <td>{{ task.dueDate }}</td>
          <td>
            <div class="assignee-cell">
              <div class="assignee-av" :style="{ background: task.assignee.color }">
                {{ task.assignee.initial }}
              </div>
              <span>{{ task.assignee.name }}</span>
            </div>
          </td>
          <td>
            <span class="status-pill" :class="statusClass(task.status)">
              {{ statusLabel(task.status) }}
            </span>
          </td>
          <td>
            <div class="progress-bar-wrap">
              <div
                class="progress-bar-fill"
                :class="fillClass(task.status)"
                :style="{ width: task.progress + '%' }"
              ></div>
            </div>
          </td>
          <td><div class="more-btn" @click="openTask(task)">···</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/taskStore'
import { computed } from 'vue'

const store = useTaskStore()

// Données enrichies pour l'affichage
const tasks = computed(() => store.tasks.map(t => enrichTask(t)))

function enrichTask(t) {
  const assignees = {
    'Sarah': { name: 'Sarah', initial: 'S', color: 'linear-gradient(135deg, #3ecfae, #1d9e75)' },
    'Mike':  { name: 'Mike',  initial: 'M', color: 'linear-gradient(135deg, #5b9cf6, #3a7bd5)' },
    'Fatima':{ name: 'Fatima',initial: 'F', color: 'linear-gradient(135deg, #f4894a, #e06020)' },
    'Chen':  { name: 'Chen',  initial: 'C', color: 'linear-gradient(135deg, #a78bfa, #7c3aed)' },
  }
  const icons = [
    { class: 'ti-yellow', emoji: '💡' },
    { class: 'ti-purple', emoji: '⚙️' },
    { class: 'ti-teal',   emoji: '🎨' },
    { class: 'ti-orange', emoji: '🔬' },
  ]
  const iconIdx = t.id % icons.length
  const progressMap = { todo: 10, in_progress: 60, done: 100, cancelled: 30 }

  return {
    ...t,
    iconClass: icons[iconIdx].class,
    emoji: icons[iconIdx].emoji,
    assignee: assignees[t.assignee_name] || { name: t.assignee_name || 'N/A', initial: '?', color: 'rgba(255,255,255,0.1)' },
    dueDate: t.due_date ? new Date(t.due_date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }) : '—',
    progress: progressMap[t.status] ?? 50,
  }
}

function statusLabel(status) {
  const map = { todo: 'À faire', in_progress: 'En cours', done: 'Terminé', cancelled: 'Brouillon' }
  return map[status] || status
}

function statusClass(status) {
  const map = { todo: 'pill-draft', in_progress: 'pill-progress', done: 'pill-done', cancelled: 'pill-draft' }
  return map[status] || 'pill-draft'
}

function fillClass(status) {
  const map = { todo: 'fill-muted', in_progress: 'fill-orange', done: 'fill-teal', cancelled: 'fill-muted' }
  return map[status] || 'fill-muted'
}

function openTask(task) {
  console.log('Open task:', task.id)
}
</script>

<style scoped>
.task-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  position: relative; overflow: hidden;
  margin-bottom: 16px;
}

.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
}

.task-toolbar {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px;
}

.task-title { font-size: 13px; font-weight: 600; flex: 1; }
.card-menu  { font-size: 14px; color: var(--text-muted); cursor: pointer; letter-spacing: 2px; }

.filter-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 20px;
  font-size: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-secondary); cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); }

table.task-list { width: 100%; border-collapse: collapse; }

.task-list th {
  padding: 8px 16px; text-align: left;
  font-size: 10px; font-weight: 600;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.task-list td {
  padding: 10px 16px; font-size: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: var(--text-secondary); vertical-align: middle;
}

.task-list tr:hover td { background: rgba(255,255,255,0.03); }
.task-list tr:last-child td { border-bottom: none; }

.task-check {
  width: 15px; height: 15px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.2);
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(62,207,174,0.15);
  font-size: 8px; color: var(--accent-teal);
}

.task-name-cell { display: flex; align-items: center; gap: 8px; }

.task-icon {
  width: 22px; height: 22px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0;
}
.ti-yellow { background: rgba(244,180,74,0.2); }
.ti-purple { background: rgba(147,91,246,0.2); }
.ti-teal   { background: rgba(62,207,174,0.2); }
.ti-orange { background: rgba(244,137,74,0.2); }

.task-name { font-size: 12px; color: var(--text-primary); font-weight: 500; }
.task-proj { font-size: 10px; color: var(--text-muted); }

.assignee-cell { display: flex; align-items: center; gap: 5px; }
.assignee-av {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 600;
}

.status-pill {
  display: inline-block; padding: 3px 9px;
  border-radius: 20px; font-size: 9px; font-weight: 700;
  letter-spacing: 0.04em; text-transform: uppercase;
}
.pill-progress { background: rgba(244,137,74,0.2); color: var(--accent-orange); border: 1px solid rgba(244,137,74,0.3); }
.pill-done     { background: rgba(62,207,174,0.15); color: var(--accent-teal);   border: 1px solid rgba(62,207,174,0.25); }
.pill-draft    { background: rgba(255,255,255,0.07); color: var(--text-secondary); border: 1px solid rgba(255,255,255,0.1); }

.progress-bar-wrap {
  background: rgba(255,255,255,0.07);
  border-radius: 10px; height: 5px; width: 90px;
}
.progress-bar-fill { height: 100%; border-radius: 10px; transition: width 0.5s ease; }
.fill-orange { background: linear-gradient(90deg, var(--accent-orange), #f4c34a); }
.fill-teal   { background: linear-gradient(90deg, var(--accent-teal), #5b9cf6); }
.fill-muted  { background: rgba(255,255,255,0.15); }

.more-btn { color: var(--text-muted); cursor: pointer; font-size: 14px; letter-spacing: 2px; }
</style>
