<template>
  <div class="container" id="app">
    <!-- Routed Component -->
    <router-view />
  </div>
</template>

<script>
/**
 * Main App Component with router
 */
export default { name: "App" };
</script>

<style>
@import url("./main.css");
#app {
  /* Background with JoyStick */
  background-image: linear-gradient(
      to right,
      rgb(240, 243, 244, 0.95) 0%,
      rgb(240, 243, 244, 0.95) 100%
    ),
    url("./assets/games.svg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: bottom left;
}
</style>
