<template>
  <div class="tabs-bar">
    <div
      v-for="tab in tabs"
      :key="tab.label"
      class="tab"
      :class="{ active: activeTab === tab.label }"
      @click="activeTab = tab.label"
    >
      <span>{{ tab.icon }}</span> {{ tab.label }}
    </div>

    <div class="tab-filters">
      <div v-for="f in filters" :key="f.label"
        class="filter-btn"
        :class="{ 'filter-active': f.active }"
      >{{ f.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('Dashboard')

const tabs = [
  { label: 'Informations', icon: 'ℹ' },
  { label: 'Dashboard',    icon: '⊞' },
  { label: 'Board',        icon: '⊟' },
  { label: 'Timeline',     icon: '⊡' },
  { label: 'List',         icon: '≡' },
]

const filters = [
  { label: 'All projects', active: false },
  { label: 'My tasks',     active: false },
  { label: 'This week',    active: false },
  { label: '✦ Ask our AI', active: true  },
]
</script>

<style scoped>
.tabs-bar {
  display: flex; align-items: center; gap: 2px;
  padding: 0 20px;
  background: rgba(8,18,32,0.4);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

.tab {
  padding: 11px 14px; font-size: 12px;
  color: var(--text-secondary); cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
  white-space: nowrap;
}
.tab:hover  { color: var(--text-primary); }
.tab.active { color: var(--text-primary); border-bottom-color: var(--accent-teal); }

.tab-filters {
  margin-left: auto;
  display: flex; gap: 6px; padding: 6px 0;
}

.filter-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 20px;
  font-size: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-secondary);
  cursor: pointer; transition: all 0.2s;
  white-space: nowrap;
}
.filter-btn:hover    { background: rgba(255,255,255,0.1); color: var(--text-primary); }
.filter-btn.filter-active {
  background: rgba(62,207,174,0.1);
  border-color: rgba(62,207,174,0.25);
  color: var(--accent-teal);
}
</style>
