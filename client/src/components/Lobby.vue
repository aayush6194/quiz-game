<template>
  <div class="lobby">
    <h1 class="txt-primary txt-center">
      Waiting for players to join...
    </h1>
    <h1 class="txt-center"><i class="fas fa-spinner spin txt-primary"></i></h1>
    <div class="card">
    <div class="bold txt-md"> Players Joined</div>
    <ul class="options">
   
      <li v-for="(p, index) in players" :key="p" class="capitalize">
         {{ index + 1}}. {{ p.name }}
      </li>
    </ul>
      </div>
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
}

.lobby {
  width: 100%;
  display: grid;
  grid-gap: 1em;
  place-items: stretch;
}
</style>
