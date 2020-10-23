<template>
  <div class="wrapper appear">
    <h1>Welcome to quiz App</h1>
    <h1>Select a player</h1>
    <ul class="options">
      <li>
        <button class="btn-option" v-on:click="setPlayer('MALE')">
          <img alt="Male Avatar" :src="maleAvatar" />
          <div class="txt-center">Player 1</div>
        </button>
      </li>

       <li>
        <button class="btn-option" v-on:click="setPlayer('FEMALE')">
          <img alt="Male Avatar" :src="femaleAvatar" />
          <div class="txt-center">Player 2</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import maleAvatar from "../assets/user1.png";
import femaleAvatar from "../assets/user2.png";
export default {
  name: "Question",
  props: {
    player: Object,
    setPlayer: Function
  },
  data: () => ({
    maleAvatar,
    femaleAvatar
  })
};
</script>

<style scoped>
.wrapper {
  padding: 1em;
  max-width: 95vw;
  animation: appear 300ms ease;
  place-self: start center;
}
.txt-center {
  text-align: center;
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
