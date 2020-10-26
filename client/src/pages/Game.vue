<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" :timerUpdate="timerUpdate" />
    <h1 v-else-if="time > 0">{{ time }}</h1>
    <div v-else-if="!getQuestion">
      <h1>Waiting for players to join...</h1>
      <ul class="options">
        <li v-for="p in players" :key="p">
          {{ p.name }}
        </li>
      </ul>
      <button @click="startVoting">Start Quiz!</button>
    </div>
    <Question v-else :data="data" :question="getQuestion" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room
  },
  computed: {
    ...mapGetters(["player", "players", "questions"]),
    getQuestion() {
      return this.$store.getters.getQuestionUnderVote;
    }
  },

  data: function() {
    return {
      room: undefined
    };
  },
  methods: {
    ...mapActions(["startVoting"]),
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
