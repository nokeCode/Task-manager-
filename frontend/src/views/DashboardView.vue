<template>
  <div class="dashboard-view">
    <header class="dashboard-header">
      <div class="header-left">
        <h1>Zenithal</h1>
        <div class="ai-badge">Try our AI assistance? <span class="explore">Explore 🧭</span></div>
        <div class="header-date">Sept 20, 2026</div>
      </div>
      
      <div class="header-right">
        <div class="tabs">
          <button class="tab">Informations</button>
          <button class="tab active">Dashboard</button>
          <button class="tab">Board</button>
          <button class="tab">Timeline</button>
          <button class="tab">List</button>
        </div>
        
        <div class="view-filters">
          <button class="filter-link active">All projects</button>
          <button class="filter-link">My tasks</button>
          <button class="filter-link">This week</button>
          <button class="btn-ai">Ask our AI</button>
        </div>
      </div>
    </header>

    <div class="dashboard-grid">
      <!-- Stat Cards -->
      <section class="stats-section">
        <StatCards />
      </section>

      <!-- Middle row: Progress and AI Insights -->
      <div class="middle-row">
        <ProgressCard class="progress-section" />
        <AIInsights class="ai-section" />
      </div>

      <!-- Bottom section: Task List -->
      <section class="tasks-section">
        <TaskTable />
      </section>
    </div>

    <footer class="aesthetic-footer">
      Aesthetic theme based on KÄHVI
    </footer>
  </div>
</template>

<script setup>
import StatCards from '../components/StatCards.vue'
import ProgressCard from '../components/ProgressCard.vue'
import AIInsights from '../components/AIInsights.vue'
import TaskTable from '../components/TaskTable.vue'
</script>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.8s ease-out;
  position: relative;
  min-height: 100%;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 0;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.ai-badge {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.explore {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.header-date {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.tabs {
  display: flex;
  gap: 24px;
}

.tab {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab.active {
  color: white;
  border-bottom-color: white;
}

.view-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-link {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
}

.filter-link.active {
  background: white;
  color: #0d1b2a;
}

.btn-ai {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.middle-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.aesthetic-footer {
  text-align: right;
  font-size: 10px;
  opacity: 0.3;
  color: white;
  margin-top: 20px;
  margin-bottom: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

