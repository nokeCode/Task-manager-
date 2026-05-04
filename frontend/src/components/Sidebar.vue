<template>
  <aside class="sidebar">
    <div class="sidebar-content glass">
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="brand-text">TaskFlow</span>
      </div>

      <nav class="navigation">
        <div class="nav-group">
          <span class="nav-title">Menu Principal</span>
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
            </span>
            <span>Dashboard</span>
          </router-link>
          
          <router-link to="/tasks" class="nav-link">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </span>
            <span>Mes Tâches</span>
            <span class="nav-badge" v-if="pendingCount">{{ pendingCount }}</span>
          </router-link>

          <router-link to="/calendar" class="nav-link">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </span>
            <span>Calendrier</span>
          </router-link>
        </div>

        <div class="nav-group">
          <span class="nav-title">Espaces de Travail</span>
          <div class="workspace-list">
            <div v-for="space in workspaces" :key="space.id" class="workspace-item">
              <span class="workspace-dot" :style="{ background: space.color }"></span>
              <span class="workspace-name">{{ space.name }}</span>
              <span class="workspace-lock" v-if="space.locked">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9.243 2 7 4.243 7 7v3H5v12h14V10h-2V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3z"/>
                </svg>
              </span>
            </div>
            <button class="btn-add-workspace">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>Nouvel espace</span>
            </button>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="upgrade-card glass-card">
          <div class="upgrade-icon">✨</div>
          <div class="upgrade-content">
            <p class="upgrade-title">Version Pro</p>
            <p class="upgrade-desc">Débloquez tout le potentiel</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const pendingCount = computed(() => taskStore.tasks.filter(t => t.status === 'todo').length)

const workspaces = [
  { id: 1, name: 'Design System', color: '#3B5A64', locked: false },
  { id: 2, name: 'Marketing Q4', color: '#6D8D97', locked: true },
  { id: 3, name: 'Développement', color: '#C9D8DD', locked: false },
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  padding: 20px;
  z-index: 100;
}

.sidebar-content {
  height: 100%;
  border-radius: var(--radius-xl);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(59, 90, 100, 0.08);
}

.brand-icon {
  width: 44px;
  height: 44px;
  background: var(--gradient-deep);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 90, 100, 0.3);
}

.brand-icon svg {
  width: 22px;
  height: 22px;
}

.brand-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--deep-teal);
  letter-spacing: -0.5px;
}

.navigation {
  flex: 1;
  overflow-y: auto;
}

.nav-group {
  margin-bottom: 32px;
}

.nav-title {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--muted-teal);
  margin-bottom: 14px;
  font-weight: 600;
  opacity: 0.8;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  color: var(--muted-teal);
  text-decoration: none;
  margin-bottom: 6px;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  background: rgba(59, 90, 100, 0.06);
  color: var(--deep-teal);
  transform: translateX(4px);
}

.nav-link.active {
  background: var(--deep-teal);
  color: white;
  box-shadow: 0 4px 16px rgba(59, 90, 100, 0.25);
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-badge {
  margin-left: auto;
  background: rgba(255, 107, 107, 0.15);
  color: #FF6B6B;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.nav-link.active .nav-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.workspace-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.workspace-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.workspace-item:hover {
  background: rgba(59, 90, 100, 0.04);
}

.workspace-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.workspace-name {
  flex: 1;
  font-size: 0.9rem;
  color: var(--deep-teal);
  font-weight: 500;
}

.workspace-lock {
  opacity: 0.4;
  color: var(--muted-teal);
}

.btn-add-workspace {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  margin-top: 8px;
  border: 1.5px dashed rgba(109, 141, 151, 0.3);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--muted-teal);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: 500;
}

.btn-add-workspace:hover {
  border-color: var(--deep-teal);
  color: var(--deep-teal);
  background: rgba(59, 90, 100, 0.04);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(59, 90, 100, 0.08);
}

.upgrade-card {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.upgrade-card:hover {
  transform: scale(1.02);
}

.upgrade-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.upgrade-content {
  display: flex;
  flex-direction: column;
}

.upgrade-title {
  font-weight: 600;
  color: var(--deep-teal);
  font-size: 0.95rem;
  margin-bottom: 2px;
}

.upgrade-desc {
  font-size: 0.8rem;
  color: var(--muted-teal);
}
</style>