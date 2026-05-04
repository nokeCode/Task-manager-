<template>
  <div id="app">
    <div class="layout-wrapper">
      <AppSidebar class="glass sidebar-main" />
      <div class="layout">
        <AppTopbar />
        <main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './components/AppSidebar.vue'
import AppTopbar from './components/AppTopbar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

#app {
  min-height: 100vh;
}

.layout-wrapper {
  display: flex;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
}

.sidebar-main {
  width: 280px;
  flex-shrink: 0;
  border-radius: 24px !important;
}

.layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main {
  flex: 1;
  overflow-y: auto;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>


/* scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

/* animations globales */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
