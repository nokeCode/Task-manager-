<template>
  <div class="sidebar-icons">
    <div
      v-for="icon in topIcons"
      :key="icon.label"
      class="side-icon"
      :class="{ active: activeIcon === icon.label }"
      :title="icon.label"
      @click="activeIcon = icon.label"
    >{{ icon.emoji }}</div>

    <div style="flex:1"></div>

    <div
      v-for="icon in bottomIcons"
      :key="icon.label"
      class="side-icon"
      :title="icon.label"
    >{{ icon.emoji }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIcon = ref('Home')

const topIcons = [
  { label: 'Home',     emoji: '🏠' },
  { label: 'Tasks',    emoji: '📋' },
  { label: 'Calendar', emoji: '📅' },
  { label: 'Messages', emoji: '💬' },
  { label: 'Docs',     emoji: '📄' },
]

const bottomIcons = [
  { label: 'Settings',  emoji: '⚙️' },
  { label: 'Analytics', emoji: '📊' },
  { label: 'Logout',    emoji: '🚪' },
]
</script>

<style scoped>
.sidebar-icons {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 44px;
  z-index: 20;
  background: rgba(6,14,25,0.9);
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
}

.side-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: var(--text-muted);
}

.side-icon:hover,
.side-icon.active {
  background: rgba(255,255,255,0.1);
  color: var(--text-primary);
}

.side-icon.active {
  color: var(--accent-teal);
}
</style>
