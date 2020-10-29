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
      <div :v-if='error' class="danger slide-down" :style="{ margin: '.5em' }">
        Error! Make sure the Room Code is correct.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { sendMessage } from "../socket";

/**
 * Room components allows users to join or create room.
 */
export default {
  name: "Room",
  data() {
    return {
      join: undefined,
      roomId: "",
      error: false,
    };
  },
  computed: mapGetters(["player"]),
  methods: {
    ...mapActions(["setRoom"]),
    setJoin: function(join) {
      this.join = join;
    },
    setRoom() {
      if (this.roomId.length < 5) {
        this.error = true;
      } else {
        sendMessage({
          type: "START_JOIN_ROOM",
          payload: { playerId: this.player.id, roomId: this.roomId },
        });
      }
    },
    createRoom() {
      sendMessage({
        type: "CREATE_ROOM",
        payload: { playerId: this.player.id },
      });
    },
  },
};
</script>

<style scoped>
.cols {
  padding: 0;
  grid-template-columns: 1fr auto;
  place-items: stretch;
  grid-gap: 0.5em;
}
.btn-primary {
  width: 100%;
}
.options {
  grid-gap: 1em;
  place-items: stretch;
}
@media (max-width: 768px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
