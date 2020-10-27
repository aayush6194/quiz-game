<template>
  <div class="lobby">
    <h1>
      Waiting for players to join...
    </h1>
    <h1 class="txt-center"><i class="fas fa-spinner spin"></i></h1>
    <ul class="options">
      <li v-for="p in players" :key="p">
        {{ p.name }}
      </li>
    </ul>
    <button @click="startVoting" class="btn-option">Start Quiz!</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Lobby",
  computed: mapGetters(["players"]),

  data: function() {
    return {
      dots: 3,
    };
  },
  methods: {
    ...mapActions(["startVoting"]),
    timerUpdate() {
      if (this.dots > 0) {
        setTimeout(() => {
          this.dots -= 1;
          this.timerUpdate();
        }, 1000);
      } else {
        this.dots = 3;
        this.timerUpdate();
      }
    },
  },
  created: function() {
    this.timerUpdate();
  },
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

.lobby {
  width: 100%;
  display: grid;
  place-items: stretch;
}
</style>
