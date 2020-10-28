<template>
  <div class="wrapper appear">
    <div v-if="join === undefined">
      <h1 class="txt-center">Select a Room</h1>
      <ul class="options">
        <li>
          <button @click="createRoom()" class="txt-md btn-primary">
            <i class="fas fa-hammer"></i> Create a Room
          </button>
        </li>

        <li>
          <button @click="setJoin(true)" class="txt-md btn-primary">
            <i class="fas fa-plus-circle"></i> Join a Room
          </button>
        </li>
      </ul>
    </div>

    <div v-else-if="join">
      <h1>Enter the Room Code</h1>
      <div class="grid cols">
        <input v-model="roomId" />
        <button @click="setRoom(roomId)">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { sendMessage } from "../socket";

export default {
  name: "Room",
  props: {
    timerUpdate: Function
  },
  data: () => ({
    join: undefined,
    roomId: ""
  }),
  computed: mapGetters(["player"]),
  methods: {
    ...mapActions(["setRoom"]),
    setJoin: function(join) {
      this.join = join;
    },
    setRoom() {
      sendMessage({
        type: "START_JOIN_ROOM",
        payload: { playerId: this.player.id, roomId: this.roomId }
      });
    },
    createRoom() {
      sendMessage({
        type: "CREATE_ROOM",
        payload: { playerId: this.player.id }
      });
    }
  }
};
</script>

<style scoped>
.cols {
  padding: 0;
  grid-template-columns: 1fr auto;
  place-items: stretch;
  grid-gap: 0.5em;
}

.options {
  grid-gap: 1em;
}
</style>