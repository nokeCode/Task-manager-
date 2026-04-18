<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">📋 TaskManager</div>
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <a href="http://localhost:8000/admin" target="_blank">Admin Django</a>
      </div>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
}

.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 2rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 1;
}

main {
  min-height: calc(100vh - 60px);
}
</style>