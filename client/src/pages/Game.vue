<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" :timerUpdate="timerUpdate" />
    <Lobby v-else-if="!getQuestion" />
    <h1 v-else-if="!start">
      <Timer :defaultTime="time" :onFinish="startGame" />
    </h1>
    <Question v-else :data="data" :question="getQuestion" :vote="vote" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import Lobby from "../components/Lobby.vue";
import Timer from "../components/Timer";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room,
    Lobby,
    Timer
  },
  computed: {
    ...mapGetters(["player", "players", "questions"]),
    getQuestion() {
      return this.$store.getters.getQuestionUnderVote;
    }
  },

  data: function() {
    return {
      room: undefined,
      time: 3,
      start: false
    };
  },
  methods: {
    ...mapActions(["startVoting", "addVote"]),
    vote(choiceId) {
      // FIXME: handle multiple users with their id
      this.addVote({ playerId: 0, choiceId });
    },
    startGame() {
      this.start = true;
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