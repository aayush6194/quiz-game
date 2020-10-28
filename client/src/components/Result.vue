<template>
  <div class="card result-wrapper">
    <div class="txt-primary txt-center txt-lg bold">Results <i class="fas fa-medal"></i></div>
    <ul class="results">
      {{ result }}
      {{ question }}
      {{ players }}
      <!-- <li v-for="data in player" :key="data.player.name">
        <div class="score card no-select">
          <img
            class="img"
            src="../assets/prize.svg"
            :style="{ width: `60px` }"
          />
          <img class="img avatar" :src='`../assets/user${}.png`' />
          <div class="txt-md bold capitalize">{{ data.player.name }}</div>
          <div
            class="txt-md txt-left txt-primary bold"
            :style="{ placeSelf: `center` }"
          >
            <i class="fa fa-check" aria-hidden="true"></i> Correct
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Result",
  computed: mapGetters(["result", "question", "players"]),
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