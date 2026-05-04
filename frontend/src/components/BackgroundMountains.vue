<template>
  <svg class="bg-mountains" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a4035" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#0d2518" stop-opacity="0.4"/>
      </linearGradient>
      <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0e2f3e" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#071822" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#122b1c" stop-opacity="1"/>
        <stop offset="100%" stop-color="#0a1a10" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(220,240,255,0.7)"/>
        <stop offset="100%" stop-color="rgba(180,220,210,0)"/>
      </linearGradient>
    </defs>
    <!-- Montagnes du fond -->
    <path d="M0,300 L0,180 L80,100 L160,150 L260,50 L380,130 L480,80 L560,140 L650,60 L740,110 L820,40 L900,100 L1000,70 L1100,120 L1200,90 L1200,300 Z" fill="url(#mtn2)"/>
    <!-- Montagnes du milieu -->
    <path d="M0,300 L0,220 L100,160 L200,200 L300,120 L420,190 L520,130 L620,170 L720,100 L820,160 L940,110 L1050,170 L1150,130 L1200,160 L1200,300 Z" fill="url(#mtn1)"/>
    <!-- Montagnes du devant -->
    <path d="M0,300 L0,260 L120,200 L250,240 L370,180 L480,230 L580,195 L680,235 L780,190 L880,220 L980,185 L1080,215 L1200,200 L1200,300 Z" fill="url(#mtn3)"/>
    <!-- Neige sur les sommets -->
    <path d="M260,50 L220,80 L300,80 Z" fill="url(#snow)" opacity="0.6"/>
    <path d="M820,40 L790,65 L850,65 Z" fill="url(#snow)" opacity="0.5"/>
    <path d="M650,60 L620,88 L680,88 Z" fill="url(#snow)" opacity="0.5"/>
    <!-- Ligne de forêt -->
    <path d="M0,300 L0,275 C80,265 160,255 250,268 C340,280 400,260 500,270 C600,280 700,262 800,272 C900,282 1000,265 1100,272 L1200,270 L1200,300 Z" fill="#091810" opacity="0.8"/>
    <!-- Silhouettes d'arbres -->
    <g fill="#071410" opacity="0.9">
      <polygon points="30,275 38,255 46,275"/>
      <polygon points="55,278 63,255 71,278"/>
      <polygon points="80,273 90,248 100,273"/>
      <polygon points="110,277 118,258 126,277"/>
      <polygon points="150,274 160,250 170,274"/>
      <polygon points="200,276 210,252 220,276"/>
      <polygon points="240,273 252,245 264,273"/>
      <polygon points="900,274 910,250 920,274"/>
      <polygon points="940,277 950,253 960,277"/>
      <polygon points="980,273 992,246 1004,273"/>
      <polygon points="1050,275 1060,252 1070,275"/>
      <polygon points="1100,276 1112,250 1124,276"/>
      <polygon points="1150,274 1162,248 1174,274"/>
    </g>
  </svg>
</template>

<style scoped>
.bg-mountains {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 1;
  pointer-events: none;
  height: 45vh;
  width: 100%;
  opacity: 0.5;
}
</style>
