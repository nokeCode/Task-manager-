<template>
  <header class="top-bar">
    <div class="search-container">
      <div class="search-box glass">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input 
          type="text" 
          placeholder="Rechercher une tâche, un projet..." 
          v-model="searchQuery"
        />
        <span class="shortcut-hint">⌘K</span>
      </div>
    </div>

    <div class="header-actions">
      <div class="team-avatars">
        <div v-for="(member, i) in teamMembers.slice(0, 3)" :key="i" class="avatar-wrapper">
          <img :src="member.avatar" :alt="member.name" />
        </div>
        <div class="avatar-more" v-if="teamMembers.length > 3">
          +{{ teamMembers.length - 3 }}
        </div>
        <button class="btn-invite glass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Inviter</span>
        </button>
      </div>

      <div class="action-buttons">
        <button class="btn-action glass">Templates</button>
        <button class="btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Nouveau</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const teamMembers = [
  { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=8' },
  { name: 'David', avatar: 'https://i.pravatar.cc/150?img=11' },
]
</script>

<style scoped>
.top-bar {
  height: 80px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(to bottom, rgba(247, 249, 250, 0.9) 0%, transparent 100%);
  backdrop-filter: blur(10px);
}

.search-container {
  flex: 1;
  max-width: 480px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-radius: var(--radius-xl);
  transition: all var(--transition-fast);
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-lg);
  transform: scale(1.01);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: var(--muted-teal);
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 0.95rem;
  color: var(--deep-teal);
  font-weight: 400;
}

.search-box input::placeholder {
  color: var(--muted-teal);
  opacity: 0.7;
}

.shortcut-hint {
  padding: 6px 10px;
  background: rgba(59, 90, 100, 0.08);
  border-radius: 8px;
  font-size: 0.75rem;
  color: var(--muted-teal);
  font-weight: 600;
  font-family: monospace;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.team-avatars {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.avatar-wrapper:hover {
  transform: scale(1.1);
  z-index: 10;
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-more {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--deep-teal);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  border: 2px solid white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.avatar-more:hover {
  transform: scale(1.1);
}

.btn-invite {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-xl);
  color: var(--muted-teal);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-left: 8px;
}

.btn-invite:hover {
  color: var(--deep-teal);
  background: rgba(255, 255, 255, 0.9);
}

.btn-invite svg {
  width: 16px;
  height: 16px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-action {
  padding: 12px 24px;
  border-radius: var(--radius-xl);
  color: var(--deep-teal);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--deep-teal);
  color: white;
  border: none;
  border-radius: var(--radius-xl);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 16px rgba(59, 90, 100, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59, 90, 100, 0.4);
}

.btn-primary svg {
  width: 18px;
  height: 18px;
}
</style>