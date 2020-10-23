<template>
  <div class="container">
    <Question v-if="player.gender" :data="data" />
    <Player v-else :player="player" :setPlayer="setPlayer"/>
  </div>
</template>

<script>
import Question from "./components/Question.vue";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Question,
    Player
  },
  data: function() {
    return {
      player: {
        gender: undefined,
     //   name: undefined
      },
      data: {
        question: "None"
      }
    };
  },

  methods: {
    setPlayer: function(gender) {
      this.player = { gender };
    },
    socket: function() {
      console.log("Starting connection to WebSocket Server");
      const connection = new WebSocket("ws://localhost:8082");

      connection.onmessage = event => {
        this.data = JSON.parse(event?.data);
      };

      connection.onopen = function(event) {
        console.log(event);
      };
    }
  },
  created: function() {
    this.socket();
  }
};
</script>

<style>
body {
  margin: 0;
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
</style>