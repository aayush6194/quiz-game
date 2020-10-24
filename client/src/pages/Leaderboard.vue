<template>
  <div class="wrapper appear">
    <h1>{{ data.question }}</h1>
    <ul class="options">
      <li v-for="option in data.options" :key="option">
        <button class="btn-option" >
          {{ option }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  props: {
   data: String
  }
};
</script>

<style scoped>
</style>
