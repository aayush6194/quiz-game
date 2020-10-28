<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" :timerUpdate="timerUpdate" />
    <h1 v-else-if="time > 0">{{ time }}</h1>
    <Lobby v-else-if="!question" />
    <div v-else-if="wait">
      <h1>Waiting for other players</h1>
    </div>
 
    <Result v-else-if="result"/>
    <Question v-else :data="data" :question="question" :vote="vote" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import Result from "../components/Result.vue";
import Lobby from "../components/Lobby.vue";
//import Timer from "../components/Timer";
import { mapGetters } from "vuex";
import { sendMessage } from "../socket";

export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room,
    Lobby,
    Result,
    //  Timer
  },
  computed: mapGetters(["player", "players", "question", "wait", "result"]),

  data: function() {
    return {
      room: undefined,
      time: 0,
      start: false,
    };
  },
  methods: {
    vote(choiceId) {
      sendMessage({
        type: "CAST_VOTE",
        payload: { playerId: this.player.id, choiceId },
      });
    },
    startGame() {
      this.start = true;
    },
  },
};
</script>
