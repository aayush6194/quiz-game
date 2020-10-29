<template>
    <div class="bar" :style="getBarStyle(percent)" />
</template>

<script>
/**
 * ProgressBar component helps visualize remaining time.
 */
export default {
  name: "ProgressBar",
  props: {
   percent: Number
  },
  methods: {
    getBarStyle(percent) {
      // Length of the bar
      const width = `${percent * 10}%`;

      // Red if less than 30%, yellow if less tham 70, green else
      const background =
        percent < 3 ? "#EB5748" : percent < 7 ? "#E6EB48" : "#7fab96";
      return {
        width, 
        background
      };
    }
  }
};
</script>

<style scoped>
.bar {
  padding: 0.5em;
  border-radius: 2em;
  margin: 2em 0 0.5em 0;
  max-width: 100%;
  transition: 500ms linear;
}
</style>
