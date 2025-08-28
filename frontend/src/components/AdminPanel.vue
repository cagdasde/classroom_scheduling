<template>
  <div class="admin-panel">
    <h1>Yönetim Paneli</h1>
    <div class="cards">
      <router-link to="/courses" class="card">📚 Dersler</router-link>
      <router-link to="/classrooms" class="card">🏫 Sınıflar</router-link>
      <router-link to="/teachers" class="card">👩‍🏫 Öğretmenler</router-link>
      <router-link to="/schedule" class="card">🗓️ Ders Programı</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPanel"
}
</script>

<style scoped>
.admin-panel {
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.card {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: 200px;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  background: linear-gradient(to right, #5a67d8, #6b46c1);
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
  .card {
    font-size: 1rem;
    padding: 1rem;
  }
}
</style>
