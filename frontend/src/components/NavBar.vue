<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">📘 Akıllı Planlama</div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span :class="{'bar': true, 'bar1': true, 'change': isOpen}"></span>
        <span :class="{'bar': true, 'bar2': true, 'change': isOpen}"></span>
        <span :class="{'bar': true, 'bar3': true, 'change': isOpen}"></span>
      </button>

      <ul :class="['nav-links', { 'nav-active': isOpen }]">
        <li><router-link to="/courses" @click="closeMenu">Dersler</router-link></li>
        <li><router-link to="/courses/add" @click="closeMenu">Yeni Ders</router-link></li>
        <li><router-link to="/classrooms" @click="closeMenu">Sınıflar</router-link></li>
        <li><router-link to="/classrooms/add" @click="closeMenu">Yeni Sınıf</router-link></li>
        <li><router-link to="/schedule" @click="closeMenu">Programlar</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logo {
  font-weight: bold;
  font-size: 1.3rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
}

.menu-toggle:focus {
  outline: none;
}

/* Hamburger bars */
.bar {
  width: 28px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: 1px;
  margin: 3px 0;
}

/* Animate bars on toggle */
.change.bar1 {
  transform: rotate(45deg) translate(5px, 5px);
}

.change.bar2 {
  opacity: 0;
}

.change.bar3 {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.nav-active {
    max-height: 500px; /* yeterince büyük bir sayı */
  }

  .nav-links li a {
    padding: 1rem;
    display: block;
  }
}
</style>
