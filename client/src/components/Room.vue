<template>
  <div class="wrapper appear">
    <div v-if="join === undefined">
    <h1>Select a Room</h1>
    <ul class="options">
      <li>
        <button  @click="timerUpdate() || setJoin(false) || setRoom('111')" >
        Create a Room
        </button>
      </li>

      <li>
        <button @click="setJoin(true)">
          Join a Room
        </button>
      </li>
    </ul>
    </div>

    <div v-else-if="join">
      <h1>Enter the Room Code</h1>
      <div class="grid cols">
      <input v-model="roomId">
      <button @click="timerUpdate() || setRoom(roomId)">
        Submit
      </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Room",
  props: {
    timerUpdate: Function
  },
  data: () => ({
   join: undefined,
   roomId: ""
  }),
  methods: {
    ...mapActions(["setRoom"]),
    setJoin: function(join){
      this.join = join;
    }
  }
};
</script>

<style scoped>
.cols {
  padding: 0;
  grid-template-columns: 1fr auto;
  place-items: stretch;
  grid-gap: .5em;
}
</style>
