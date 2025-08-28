<template>
  <div id="app">
    <NavBar />        <!-- Burada navigasyon çubuğu -->
    <main class="p-4">
      <router-view /> <!-- Sayfa içeriği -->
    </main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
};
</script>

<style>
/* Global stiller istersen buraya */
</style>
