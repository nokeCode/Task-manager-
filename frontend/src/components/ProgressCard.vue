<template>
  <div class="glass-card progress-card">
    <div class="card-header">
      <div>
        <div class="card-title">Mise à jour automatique des progrès</div>
        <div class="card-subtitle">Agrès la fin il d'une tâche</div>
      </div>
      <div class="card-menu">···</div>
    </div>

    <div class="progress-grid">
      <div class="ring-wrap">
        <div class="ring-label">Aujourd'hui</div>
        <svg viewBox="0 0 70 70" class="ring-svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3ecfae"/>
              <stop offset="100%" stop-color="#5b9cf6"/>
            </linearGradient>
          </defs>
          <circle class="ring-track" cx="35" cy="35" r="28"/>
          <circle class="ring-fill" cx="35" cy="35" r="28"
            stroke="url(#grad1)"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset(75)"/>
          <text x="35" y="38" text-anchor="middle" class="ring-text">75%</text>
        </svg>
        <div class="ring-sub teal">+15% vs hier</div>
      </div>

      <div class="ring-wrap">
        <div class="ring-label">Total Progrès des Tâches</div>
        <svg viewBox="0 0 70 70" class="ring-svg">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f4894a"/>
              <stop offset="100%" stop-color="#f4c34a"/>
            </linearGradient>
          </defs>
          <circle class="ring-track" cx="35" cy="35" r="28"/>
          <circle class="ring-fill" cx="35" cy="35" r="28"
            stroke="url(#grad2)"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset(65)"/>
          <text x="35" y="38" text-anchor="middle" class="ring-text">65%</text>
        </svg>
        <div class="ring-sub orange">En cours</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const circumference = 2 * Math.PI * 28  // 175.93

function dashOffset(percent) {
  return circumference * (1 - percent / 100)
}
</script>

<style scoped>
.progress-card {
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

.progress-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px; padding: 0 16px 16px;
}

.ring-wrap {
  display: flex; flex-direction: column; align-items: center;
  background: rgba(255,255,255,0.04);
  border-radius: 10px; padding: 16px 12px;
}

.ring-label {
  font-size: 10px; color: var(--text-secondary);
  margin-bottom: 10px; text-align: center;
}

.ring-svg { width: 70px; height: 70px; }

.ring-track {
  fill: none;
  stroke: rgba(255,255,255,0.08);
  stroke-width: 7;
}

.ring-fill {
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);
}

.ring-text {
  fill: white;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
}

.ring-sub { font-size: 9px; margin-top: 4px; }
.ring-sub.teal   { color: var(--accent-teal); }
.ring-sub.orange { color: var(--accent-orange); }
</style>
