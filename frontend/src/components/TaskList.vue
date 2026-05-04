task_list = '''
<template>
  <div class="task-list-container glass-card">
    <div class="list-header">
      <h3>Task List</h3>
      <div class="filters">
        <button class="filter-btn">
          <i class="fas fa-filter"></i>
          <span>All statuses</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <button class="filter-btn">
          <i class="fas fa-folder"></i>
          <span>All projects</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <button class="more-btn">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
    <div class="table-container">
  <table class="task-table">
    <thead>
      <tr>
        <th class="checkbox-col">
          <input type="checkbox" class="custom-checkbox" />
        </th>
        <th>Collaborator</th>
        <th>Project</th>
        <th>Due date</th>
        <th>Assignee</th>
        <th>Status</th>
        <th>Progress</th>
        <th class="actions-col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task._id" class="task-row">
        <td class="checkbox-col">
          <input type="checkbox" class="custom-checkbox" />
        </td>
        <td class="collaborator-col">
          <div class="task-icon" :class="getTaskIconClass(task.title)">
            <i :class="getTaskIcon(task.title)"></i>
          </div>
          <span class="task-title">{{ task.title }}</span>
        </td>
        <td>{{ task.project }}</td>
        <td>{{ formatDate(task.dueDate) }}</td>
        <td>
          <div class="assignee">
            <div class="assignee-avatar">{{ task.assignee.initials }}</div>
            <span>{{ task.assignee.name }}</span>
          </div>
        </td>
        <td>
          <span class="status-badge" :class="getStatusClass(task.status)">
            {{ task.status }}
          </span>
        </td>
        <td>
          <div class="progress-cell">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: task.progress + '%', background: getProgressColor(task.progress) }"
              ></div>
            </div>
          </div>
        </td>
        <td class="actions-col">
          <button class="row-more-btn">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>
<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      return `${month} ${day}`;
    },
    getStatusClass(status) {
      const classes = {
        'EN COURS': 'status-en-cours',
        'TERMINE': 'status-termine',
        'BROUILLON': 'status-brouillon',
        'EN ATTENTE': 'status-en-attente'
      };
      return classes[status] || 'status-en-cours';
    },
    getProgressColor(progress) {
      if (progress === 100) return '#34d399';
      if (progress > 50) return '#60a5fa';
      if (progress > 20) return '#fb923c';
      return '#f87171';
    },
    getTaskIcon(title) {
      if (title.toLowerCase().includes('design')) return 'fas fa-palette';
      if (title.toLowerCase().includes('api')) return 'fas fa-code';
      if (title.toLowerCase().includes('brain')) return 'fas fa-lightbulb';
      if (title.toLowerCase().includes('analysis')) return 'fas fa-chart-line';
      return 'fas fa-tasks';
    },
    getTaskIconClass(title) {
      if (title.toLowerCase().includes('design')) return 'icon-design';
      if (title.toLowerCase().includes('api')) return 'icon-api';
      if (title.toLowerCase().includes('brain')) return 'icon-idea';
      if (title.toLowerCase().includes('analysis')) return 'icon-analysis';
      return 'icon-default';
    }
  }
};
</script>
<style scoped>
.task-list-container {
  padding: 20px;
  margin-top: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.list-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
}

.filters {
  display: flex;
  gap: 10px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
}

.more-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
}

.table-container {
  overflow-x: auto;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.task-table th {
  text-align: left;
  padding: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.task-table td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.task-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.checkbox-col {
  width: 40px;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  cursor: pointer;
  appearance: none;
  position: relative;
}

.custom-checkbox:checked {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.custom-checkbox:checked::after {
  content: '\\\\2713';
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.collaborator-col {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.icon-design { background: rgba(167, 139, 250, 0.2); color: #a78bfa; }
.icon-api { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
.icon-idea { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
.icon-analysis { background: rgba(52, 211, 153, 0.2); color: #34d399; }
.icon-default { background: rgba(255, 255, 255, 0.1); color: var(--text-secondary); }

.task-title {
  font-weight: 500;
  color: var(--text-primary);
}

.assignee {
  display: flex;
  align-items: center;
  gap: 10px;
}

.assignee-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.progress-cell {
  width: 100px;
}

.row-more-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.task-row:hover .row-more-btn {
  opacity: 1;
}

.status-en-attente {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
}
</style>