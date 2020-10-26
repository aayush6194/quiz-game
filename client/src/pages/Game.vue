<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" :timerUpdate="timerUpdate" />
    <h1 v-else-if="time > 0">{{ time }}</h1>
    <Question v-else :data="data" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import { mapGetters } from "vuex";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room,
  },
  computed: {
    ...mapGetters(["player", "players", "questions"])
  },

  data: function() {
    return {
      room: undefined
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
    }
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
