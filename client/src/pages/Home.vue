<template>
  <div class="container" id="app" v-bind:style="styleObject">
    <div class="grid" style="">
      <img
        class="img"
        style="max-height: 50vh;"
        src="../assets/quiz.svg"
        alt="Quiz Image"
      />
     <router-link to="/game">  <img
        class="img"
        src="../assets/play-button.png"
        alt="Start Button"
      /></router-link>
      <img
        class="img"
        src="../assets/leaderboard.svg"
        alt="Start Button"
      />
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
        backgroundPosition: "bottom left",
        //   backgroundSize: "cover"
      },
    };
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Roboto, sans-serif;
}

#app {
  height: 100vh;
}

.container {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.options {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
  place-items: stretch;
  padding: 0;
}
.img {
  max-width: 100%;
}
button {
  border: 0;
  border-radius: 0.25em;
  padding: .25em;
  box-shadow: 0 1px 3px rgba(10, 20, 10, 0.15), 0 1px 2px rgba(0, 0, 0, 0.22);
  outline: none;
  cursor: pointer;
}

button:hover {
  box-shadow: 0 0 0;
  transition: 200ms ease;
}
.grid {
  display: grid;
  padding: 1em;
  grid-gap: 1em;
  place-items: center;
}
</style>
