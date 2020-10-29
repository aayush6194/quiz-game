<template>
  <div class="result-wrapper card">
    <router-link to="/">
      <BackButton />
    </router-link>
    <div class="txt-primary txt-center txt-lg bold">
      Final Scores <i class="fas fa-medal"></i>
    </div>
    <div class=" hide-on-mobile">
      <img class="img" src="../assets/prize.svg" :style="{ width: `150px` }" />
      <div class="txt-primary bold txt-center txt-lg">Success</div>
    </div>

    <ul class="results">
      <li v-for="(data, index) in results" :key="data.player">
        <div class="result card no-select">
          <div class="txt-md bold">{{ index + 1 }}.</div>
          <img
            v-if="data.player.avatar === 0"
            class="img avatar"
            src="../assets/user1.png"
          />
          <img v-else class="img avatar" src="../assets/user2.png" />
          <div class="capitalize txt-cap">{{ data.player.name }}</div>
          <div class="txt-primary txt-md bold">
            {{ data.right }}
            <span class="txt-lg">/</span>
            {{ data.right + data.wrong }}
          </div>
        </div>
      </li>
    </ul>
    <button
      @click="playAgain"
      class="btn-primary bold"
      :style="{ fontSize: `1.2em` }"
    >
      Play Again
    </button>
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";
import { mapActions, mapGetters } from "vuex";

/**
 * Result component is render after each quiz game and shows the list of players and their scores
 */
export default {
  name: "Result",
  components: {
    BackButton
  },
  computed: mapGetters(["results", "player"]),
  methods: {
    ...mapActions(["loadResults"]),
    playAgain() {
      this.$store.commit("loadResults", {
        results: undefined
      });
      this.$store.commit("setState", "IN_LOBBY");
      this.$router.push("/game");
    }
  }
};
</script>

<style scoped>
.wrapper {
  place-self: center;
  place-items: stretch;
  display: grid;
}

.result-wrapper {
  margin: 1em;
}

.score,
.result,
.results,
.option {
  display: grid;
  grid-gap: 1em;
  place-items: center stretch;
}
.results {
  list-style: none;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(12, auto);
  min-height: 50vh;
  width: 400px;
  max-width: 85vw;
  place-items: start stretch;
  padding: 0;
}
.score {
  grid-template-columns: auto 1fr;
}
.result {
  grid-template-columns: auto auto 1fr auto;
}
.btn-primary {
  width: 100%;
}
</style>
