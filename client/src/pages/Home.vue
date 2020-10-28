<template>
  <div class="container">
    <!-- Quiz Logo -->
    <img
      class="img"
      style="max-height: 50px; place-self: start; padding: 1em"
      src="../assets/logo.svg"
      alt="Quiz Image"
    />
    <div class="grid" style="">
      <img
        class="img"
        style="max-height: 50vh;"
        src="../assets/quiz.svg"
        alt="Quiz Image"
      />
      <!-- Play Button to route to the game component -->
      <router-link to="/game">
        <img class="img" src="../assets/play-button.png" alt="Start Button" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: "Home" };
</script>
