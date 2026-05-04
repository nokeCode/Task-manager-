<template>
  <div class="stats-row">
    <div
      v-for="(card, i) in stats"
      :key="card.label"
      class="stat-card"
      :style="{ animationDelay: `${i * 0.05 + 0.05}s` }"
    >
      <div class="stat-dot" :style="{ background: card.dotColor, boxShadow: `0 0 8px ${card.dotColor}80` }"></div>
      <div class="stat-label">{{ card.label }}</div>
      <div class="stat-badge" :class="card.badgeClass">{{ card.badge }}</div>
      <div class="stat-value">{{ card.value }}</div>
      <div class="stat-meta">{{ card.meta }}</div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: 'Active Tasks',  badge: '-29%',      badgeClass: 'badge-down',    value: 24, meta: 'Total this month',  dotColor: '#3ecfae' },
  { label: 'In Progress',   badge: '0% Stable',  badgeClass: 'badge-stable',  value: 19, meta: 'Stable progress',   dotColor: '#5b9cf6' },
  { label: 'Completed',     badge: '+29%',       badgeClass: 'badge-up',      value: 12, meta: 'Improvement ↑',     dotColor: '#8b5cf6' },
  { label: 'Draft',         badge: '0%',         badgeClass: 'badge-neutral', value: 10, meta: 'Needs attention',   dotColor: 'rgba(255,255,255,0.3)' },
]
</script>

<style scoped>
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  backdrop-filter: blur(12px);
  position: relative; overflow: hidden;
  transition: transform 0.2s, background 0.2s;
  cursor: default;
}

.stat-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
}

.stat-card:hover { transform: translateY(-2px); background: var(--glass-hover); }

.stat-dot {
  position: absolute; top: 14px; right: 16px;
  width: 8px; height: 8px; border-radius: 50%;
}

.stat-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 6px; }
.stat-badge {
  font-size: 9px; padding: 2px 7px;
  border-radius: 10px; display: inline-block;
  margin-bottom: 4px; font-weight: 600;
}
.badge-down    { background: rgba(244,137,74,0.2); color: var(--accent-orange); }
.badge-stable  { background: rgba(91,156,246,0.2); color: var(--accent-blue); }
.badge-up      { background: rgba(62,207,174,0.2); color: var(--accent-teal); }
.badge-neutral { background: rgba(255,255,255,0.1); color: var(--text-secondary); }

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px; font-weight: 700; line-height: 1;
}
.stat-meta { font-size: 10px; color: var(--text-muted); margin-top: 4px; }
</style>
