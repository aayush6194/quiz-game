<template>
  <!-- Back Button -->
  <router-link
    v-if="player.length < 2 || player.avatar === -1"
    to="/"
    class="absolute"
  >
    <BackButton />
  </router-link>
  <BackButton v-else :goBack="resetPlayer" />
  <Player
    v-if="player.name.length < 2 || player.avatar === -1"
    :timerUpdate="timerUpdate"
  />
  <h1 v-else-if="time > 0">{{ time }}</h1>
  <Question v-else :data="data" />
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import BackButton from "../components/BackButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    BackButton
  },
  computed: mapGetters(["player"]),

  data: function() {
    return {
      room: undefined,
      time: 3,
      data: {
        question: "None"
      }
    };
  },

  methods: {
    timerUpdate() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 1;
          this.timerUpdate();
        }, 1000);
      }
    },

    socket: function() {
      const con = new WebSocket("ws://localhost:8082");

      con.onmessage = event => {
        this.data = JSON.parse(event?.data);
      };

      con.onopen = function(event) {
        console.log(event);
      };
    }
  },
  created: function() {
    this.socket();
  }
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
.absolute {
  position: absolute;
}
</style>
