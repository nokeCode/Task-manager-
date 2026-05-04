<template>
  <aside class="sidebar glass">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">⛰️</span>
        <span class="logo-text">Zenithal TaskFlow</span>
      </div>
      <button class="toggle-btn">
        <i class="icon-toggle">≡</i>
      </button>
    </div>

    <div class="sidebar-content">
      <div class="nav-icons">
        <div class="nav-icon active">🏠</div>
        <div class="nav-icon">📅</div>
        <div class="nav-icon">📊</div>
        <div class="nav-icon">💬</div>
        <div class="nav-icon">🔔</div>
      </div>

      <div class="nav-menu">
        <div class="menu-section">
          <div class="menu-item">My activity</div>
          <div class="menu-item">Reply message</div>
          <div class="menu-item">Direct message</div>
          <div class="menu-item">My task</div>
          <div class="menu-item">More</div>
        </div>

        <div class="menu-section">
          <div class="section-title">Space</div>
          <div class="space-item">
            <span class="arrow">▼</span>
            <span class="icon">📁</span>
            Blurryspace
          </div>
          <div class="sub-menu">
            <div class="sub-item active">
              <span class="arrow">▼</span>
              <span class="icon">#</span>
              Project 1
              <span class="lock">🔒</span>
            </div>
            <div class="nested-items">
              <div class="nested-item">Overview</div>
              <div class="nested-item">Todo list</div>
              <div class="nested-item">Document</div>
              <div class="nested-item">Presentations</div>
            </div>
            <div class="sub-item">
              <span class="arrow">▶</span>
              <span class="icon">#</span>
              Project 2
              <span class="lock">🔒</span>
            </div>
            <div class="sub-item">
              <span class="arrow">▶</span>
              <span class="icon">#</span>
              Project 3
              <span class="lock">🔒</span>
            </div>
          </div>
          
          <div class="space-item">
            <span class="arrow">▼</span>
            <span class="icon">📁</span>
            Metamorphlab
          </div>
          <div class="sub-menu">
             <div class="sub-item">
              <span class="arrow">▶</span>
              <span class="icon">#</span>
              Project 1
              <span class="lock">🔒</span>
            </div>
          </div>
        </div>
        
        <div class="add-space">+ Add new space</div>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="footer-icons">
        <div class="footer-icon">☕</div>
        <div class="footer-icon">📂</div>
      </div>
      
      <div class="boost-card">
        <div class="boost-icon">🧭</div>
        <h3>Boost Your Journey</h3>
        <p>Unlock Advanced Analytics, Global Team Automation. And Integrated Workspaties.</p>
      </div>

      <div class="user-footer">
        <div class="user-actions">
          <span>📝</span>
          <span>⚙️</span>
          <span>🚪</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
  overflow: hidden;
}

.sidebar-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.6;
}

.sidebar-content {
  flex: 1;
  display: flex;
  overflow-y: auto;
}

.nav-icons {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-icon {
  font-size: 20px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s;
  padding: 8px;
  border-radius: 12px;
}

.nav-icon:hover {
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.05);
}

.nav-icon.active {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.nav-menu {
  flex: 1;
  padding: 20px;
}

.menu-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.menu-item {
  padding: 8px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.menu-item:hover {
  color: white;
}

.space-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 500;
}

.sub-menu {
  padding-left: 12px;
  margin-bottom: 16px;
}

.sub-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.sub-item.active {
  color: white;
}

.nested-items {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
}

.nested-item {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.nested-item:hover {
  color: white;
}

.add-space {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  margin-top: 10px;
}

.sidebar-footer {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-icons {
  display: flex;
  gap: 16px;
  font-size: 18px;
  opacity: 0.6;
}

.boost-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 16px;
  text-align: center;
}

.boost-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.boost-card h3 {
  font-size: 14px;
  margin-bottom: 8px;
}

.boost-card p {
  font-size: 10px;
  opacity: 0.6;
  line-height: 1.4;
}

.user-footer {
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
}

.user-actions {
  display: flex;
  gap: 16px;
  font-size: 18px;
  opacity: 0.7;
}

.user-actions span {
  cursor: pointer;
}

.arrow { font-size: 8px; opacity: 0.5; }
.lock { font-size: 10px; margin-left: auto; opacity: 0.5; }
</style>
