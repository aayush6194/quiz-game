<template>
  <div>
    <Player v-if="!(player.name && player.avatar !== undefined)" />
    <Room v-else-if="!player.room" />
    <Lobby v-else-if="player.state === 'IN_VOTING'" />
    <div v-else-if="player.state === 'WAITING_RESULT'">
      <h1>Waiting for other players to answer...</h1>
    </div>
    <Result v-else-if="result" />
    <div v-else-if="result === null">
      <h1>No one Voted!</h1>
    </div>
    <Question v-else :data="data" :question="question" :vote="vote" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import Player from "../components/Player.vue";
import Room from "../components/Room.vue";
import Result from "../components/Result.vue";
import Lobby from "../components/Lobby.vue";
import { mapGetters } from "vuex";
import { sendMessage } from "../socket";

/**
 * Game components simulate the quiz game. Renders creating player, pick room, question components
 */
export default {
  name: "Game",
  components: {
    Question,
    Player,
    Room,
    Lobby,
    Result
  },
  computed: mapGetters(["player", "players", "question", "wait", "result"]),

  data: function() {
    return {
      room: undefined
    };
  },
  methods: {
    /**
     * @param {string} choiceId is the id of the option player voted for
     */
    vote(choiceId) {
      sendMessage({
        type: "CAST_VOTE",
        payload: { playerId: this.player.id, choiceId }
      });
    }
  }
};
</script>
