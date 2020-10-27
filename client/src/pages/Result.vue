<template>
  <div>
    <h1>Results</h1>
    {{ results }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["results"])
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
</style>
