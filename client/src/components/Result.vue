<template>
  <div class="card result-wrapper">
    <div class="txt-primary txt-center txt-lg bold">
      Results <i class="fas fa-medal"></i>
    </div>
    <ul class="results">
      <li v-for="data in players" :key="data.id">
        <div class="score card no-select">
          <img
            class="img"
            src="../assets/prize.svg"
            :style="{ width: `60px` }"
          />
          <img
            v-if="data.avatar === 0"
            class="img avatar"
            src="../assets/user1.png"
          />
          <img v-else class="img avatar" src="../assets/user2.png" />
          <div class="txt-md bold capitalize">{{ data.name }}</div>
          <div
            class="txt-md txt-left txt-primary bold"
            :style="{ placeSelf: `center` }"
          >
            <span v-if="isCorrect(data.id)">
              <i class="fa fa-check" aria-hidden="true"></i> Correct
            </span>

            <span v-else class="wrong">
              <i class="fa fa-check" aria-hidden="true"></i> Wrong
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
/**
 * Result components is rendered after answer each question. Shows result of each question
 */
export default {
  name: "Result",
  computed: {
    ...mapGetters(["result", "question", "players"]),
    correctId() {
      const [answer] = this.question.choices.filter(({ isAnswer }) => isAnswer);
      const { id: correctId } = answer;
      return correctId;
    },
  },
  methods: {
    /**
     * @param {string} playerId is the id of player
     * @return {boolean} returns true if player answered correctly
     */
    isCorrect(playerId) {
      // result[correctId] contains Ids of player with correct choices
      return (
        this.result[this.correctId] &&
        this.result[this.correctId].includes(playerId)
      );
    },
  },
};
</script>

<style scoped>
.result-wrapper {
  margin: 1em;
}
.score,
.results {
  display: grid;
  grid-gap: 1em;
  place-items: center stretch;
}
.results {
  list-style: none;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(12, auto);
  min-height: 50vh;

  place-items: start stretch;
  padding: 0;
}
.score {
  grid-template-columns: auto auto 1fr auto;
}

.wrong {
  color: red;
}
</style>
