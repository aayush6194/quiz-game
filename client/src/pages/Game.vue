<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" :timerUpdate="timerUpdate" />
    <h1 v-else-if="time > 0">{{ time }}</h1>
    <Lobby v-else-if="!question" />
    <div v-else-if="wait">
      <h1>Waiting</h1>
    </div>
    <div v-else-if="result">
      <h1>{{ result }}</h1>
    </div>
    <Question v-else :data="data" :question="question" :vote="vote" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import Lobby from "../components/Lobby.vue";
import { sendMessage } from "../socket";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room,
    Lobby
  },
  computed: {
    ...mapGetters(["player", "players", "question", "wait", "result"])
  },
  methods: {
    vote(choiceId) {
      sendMessage({
        type: "CAST_VOTE",
        payload: { playerId: this.player.id, choiceId }
      });
    },
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
</style>