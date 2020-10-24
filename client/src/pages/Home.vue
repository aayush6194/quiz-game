<template>
    <Question v-if="player.gender" :data="data" />
    <Player v-else :player="player" :setPlayer="setPlayer" />
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";

export default {
  name: "Home",
  components: {
    Question,
    Player,
  },
  data: function() {
    return {
      player: {
        gender: undefined,
      },
      data: {
        question: "None",
      },
    };
  },

  methods: {
    setPlayer: function(gender) {
      this.player = { gender };
    },
    socket: function() {
      const con = new WebSocket("ws://localhost:8082");

      con.onmessage = (event) => {
        this.data = JSON.parse(event?.data);
      };

      con.onopen = function(event) {
        console.log(event);
      };
    },
  },
  created: function() {
    this.socket();
  },
};
</script>

<style scoped>
.options {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
  place-items: stretch;
  padding: 0;
}
</style>
