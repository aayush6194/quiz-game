<template>
  <div class="container" id="app" v-bind:style="styleObject">
     <router-view />
  </div>
</template>

<script>
import Games from "./assets/games.svg";

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
      },
    };
  },
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

button, input, .card {
  border-radius: .25em;
  outline: none;
  border-width: 0;
}

button {
  box-shadow: 0 1px 3px rgba(10, 20, 10, 0.15), 0 1px 2px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}

input{
  width: 100%;
  box-sizing: border-box;
  padding: .5em;
  border-width: 1px
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

.txt-center {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.absolute {
  position: absolute;
}

@keyframes appear {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
