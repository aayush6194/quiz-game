<template>
  <div class="wrapper card">
    <router-link to="/">
      <BackButton />
    </router-link>

    <div class="txt-primary txt-center txt-lg bold">Scores</div>

    <div class="winner">
      <img class="img" src="../assets/prize.svg" :style="{ width: '150px' }" />
    </div>

    <ul class="results">
      <li v-for="(data, index) in result" :key="data.player">
        <div class="result card">
          <div class="txt-md bold">{{ index + 1 }}.</div>
          <img class="img avatar"  src='../assets/user1.png'/>
          <div class="capitalize">{{ data.player }}</div>
          <div class="txt-primary txt-md bold score">
            {{ data.right }}
            <span class="txt-lg">/</span>
            {{ data.right + data.wrong }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";

export default {
  name: "Result",
  components: {
    BackButton,
  },

  data: function() {
    return {
      result: [
        { player: "dude1", right: 0, wrong: 12 },
        { player: "dude2", right: 0, wrong: 12 },
      ],
    };
  },

  methods: {
    setPlayer: function(gender) {
      this.player = { gender };
    },

    resetPlayer: function() {
      this.player = { gender: undefined };
    },
    socket: function() {
      const con = new WebSocket("ws://localhost:8082");

      con.onmessage = (event) => {
        this.data = JSON.parse(event?.data);
      };

      con.onopen = function(event) {
        console.log(event);
      };
    },
  },
  created: function() {
    this.socket();
  },
};
</script>

<style scoped>
.wrapper {
  place-self: center;
}

.winner,
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
  place-items: start stretch;
  padding: 0;
}

.result {
  grid-template-columns: auto auto 1fr auto;
}
</style>
