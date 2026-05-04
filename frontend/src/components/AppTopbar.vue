<template>
  <div class="topbar glass">
    <div class="topbar-left">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    
    <div class="topbar-right">
      <div class="user-group">
        <div class="avatar-stack">
          <div class="avatar" style="background-image: url('https://i.pravatar.cc/150?u=1')"></div>
          <div class="avatar" style="background-image: url('https://i.pravatar.cc/150?u=2')"></div>
          <div class="avatar" style="background-image: url('https://i.pravatar.cc/150?u=3')"></div>
          <div class="avatar-more">+15</div>
        </div>
        <button class="btn-action">
          <span>+</span> Add collaborator
        </button>
      </div>

      <div class="actions">
        <button class="btn-secondary-glass">Templates</button>
        <button class="btn-primary-glass">New Space</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 70px;
  border-radius: 20px !important;
}

.topbar-left {
  flex: 1;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 8px 16px;
  width: 300px;
}

.search-icon {
  font-size: 14px;
  opacity: 0.5;
}

.search-bar input {
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  width: 100%;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.user-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-size: cover;
  margin-left: -12px;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar-more {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  margin-left: -12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.btn-action {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.actions {
  display: flex;
  gap: 12px;
}

.btn-secondary-glass {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
}

.btn-primary-glass {
  background: white;
  color: #0d1b2a;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
</style>
