<template>
  <div class="container" id="app" v-bind:style="styleObject">
    <div class="grid" style="">
      <img
        class="img"
        style="max-height: 50vh;"
        src="../assets/quiz.svg"
        alt="Quiz Image"
      />
      <router-link to="/game">
        <img class="img" src="../assets/play-button.png" alt="Start Button" />
      </router-link>

      <router-link to="/leaderboard">
        <img class="img" src="../assets/leaderboard.svg" alt="Start Button" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Games from "../assets/games.svg";

const gradient = (
  color1 = "rgba(255,255,255,0.95)",
  color2 = "rgba(255,255,255,0.95)"
) => `linear-gradient(to right, ${color1} 0%, ${color2} 100%)`;
export default {
  name: "App",
  data() {
    return {
      play: false,
      styleObject: {
        backgroundImage: `${gradient()}, url("${Games}")`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom left"
        //   backgroundSize: "cover"
      }
    };
  }
};
</script>

<style>

</style>
