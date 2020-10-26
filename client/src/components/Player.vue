<template>
  <div class="wrapper appear">
    <h1>Select a player</h1>
    <ul class="options">
      <li>
        <button :class="getButtonClass(0)" v-on:click="setAvatar(0)">
          <img alt="Male Avatar" :src="maleAvatar" class="img" />
          <div class="txt-center">Player 1</div>
        </button>
      </li>

      <li>
        <button :class="getButtonClass(1)" v-on:click="setAvatar(1)">
          <img alt="Male Avatar" :src="femaleAvatar" class="img" />
          <div class="txt-center">Player 2</div>
        </button>
      </li>
    </ul>
    <div class="grid cols">
      <input
        class=""
        placeholder="Enter your name"
        v-model="localPlayer.name"
      />
      <button
        placeholder="Enter your name"
        @click="setPlayer(localPlayer)"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script>
import maleAvatar from "../assets/user1.png";
import femaleAvatar from "../assets/user2.png";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Player",
  data: () => ({
    maleAvatar,
    femaleAvatar,
    localPlayer: {
      name: "",
      avatar: -1,
    },
  }),

  computed: mapGetters(["player"]),
  methods: {
    ...mapActions(["setPlayer"]),
    setAvatar: function(avatar) {
      this.localPlayer = { ...this.localPlayer, avatar };
    },
    getButtonClass: function(avatar) {
      return avatar === this.localPlayer.avatar
        ? "btn-option active"
        : "btn-option";
    },
  },
  created: function() {
    this.localPlayer = this.player;
  },
};
</script>

<style scoped>
.wrapper {
  padding: 1em;
  max-width: 90vw;
  animation: appear 300ms ease;
}
.txt-center {
  text-align: center;
}
.btn-option {
  border: 2px solid transparent;
}
.active {
  border-color: teal;
  box-shadow: 2px 2px 5px rgba(42, 109, 42, 0.15),
    1px 2px 2px rgba(15, 102, 29, 0.22);
}

.cols {
  padding: 0;
  grid-template-columns: 1fr auto;
  place-items: stretch;
}

@keyframes appear {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
