<template>
  <BackButton :goBack="player ? back : resetPlayer" />
  <Question v-if="player.gender" :data="data" />
  <Player v-else :player="player" :setPlayer="setPlayer" />
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import BackButton from "../components/BackButton.vue";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    BackButton,
  },
  props: {
    back: Function,
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

    resetPlayer: function() {
      this.player = { gender: undefined };
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
