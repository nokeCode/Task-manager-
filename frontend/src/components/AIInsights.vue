<template>
  <div class="glass-card ai-card">
    <div class="card-header">
      <div>
        <div class="card-title">✦ AI Insights</div>
        <div class="card-subtitle">Smart suggestions from your recent activity</div>
      </div>
      <div class="card-menu">···</div>
    </div>

    <div class="ai-body">
      <div v-if="showSuggestion" class="ai-suggestion">
        <div class="ai-dot"></div>
        <span>Focus on tasks with approaching deadlines</span>
        <div class="ai-close" @click="showSuggestion = false">✕</div>
      </div>

      <div class="ai-thumbs">
        <div v-for="thumb in thumbs" :key="thumb.title" class="ai-thumb">
          <div class="ai-thumb-img" :style="{ background: thumb.bg }">{{ thumb.emoji }}</div>
          <div class="ai-thumb-title">{{ thumb.title }}</div>
          <div class="ai-thumb-meta">{{ thumb.meta }} · <span class="ai-link">{{ thumb.link }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSuggestion = ref(true)

const thumbs = [
  {
    title: 'Design Team Sync',
    meta: '4 hours ago',
    link: 'Open feedback',
    emoji: '🎨',
    bg: 'linear-gradient(135deg, rgba(62,207,174,0.3), rgba(91,156,246,0.3))'
  },
  {
    title: 'Sprint Planning Doc',
    meta: 'Yesterday',
    link: 'Open diagram',
    emoji: '📋',
    bg: 'linear-gradient(135deg, rgba(244,137,74,0.3), rgba(244,196,74,0.3))'
  }
]
</script>

<style scoped>
.ai-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  position: relative; overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
}

.card-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 14px 16px 10px;
}

.card-title    { font-size: 12px; font-weight: 600; }
.card-subtitle { font-size: 10px; color: var(--text-muted); margin-top: 2px; }
.card-menu     { font-size: 14px; color: var(--text-muted); cursor: pointer; letter-spacing: 2px; }

.ai-body { padding: 0 16px 16px; }

.ai-suggestion {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px;
  background: rgba(62,207,174,0.08);
  border: 1px solid rgba(62,207,174,0.18);
  border-radius: 8px; margin-bottom: 10px;
  font-size: 11px; color: var(--text-secondary);
}

.ai-dot  { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-teal); flex-shrink: 0; }
.ai-close { margin-left: auto; color: var(--text-muted); cursor: pointer; font-size: 12px; }

.ai-thumbs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.ai-thumb {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; padding: 8px;
  cursor: pointer; transition: all 0.2s;
}
.ai-thumb:hover { background: rgba(255,255,255,0.08); }

.ai-thumb-img {
  height: 40px; border-radius: 6px;
  margin-bottom: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}

.ai-thumb-title { font-size: 10px; font-weight: 500; margin-bottom: 2px; color: var(--text-primary); }
.ai-thumb-meta  { font-size: 9px; color: var(--text-muted); }
.ai-link        { color: var(--accent-teal); }
</style>
