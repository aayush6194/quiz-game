<template>
  <div class="wrapper appear">
    <h1>Select a Room</h1>
    <ul class="options">
      <li>
        <button>
        Create a Room
        </button>
      </li>

      <li>
        <button>
          Join a Room
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Room",
  props: {
    room: Object,
    setRoom: Function
  },
  data: () => ({
   
  }),
};
</script>

<style scoped>

</style>
