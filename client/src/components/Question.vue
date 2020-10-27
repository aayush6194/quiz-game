<template>
  <div class="wrapper appear">
    <h1>{{ question.question }}</h1>
    <ul class="options">
      <li v-for="(option, index) in question.choices" :key="option">
        <button @click="vote(index)" class="btn-option">
          {{ option.value }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    data: String,
    question: [],
    vote: Function
  },
  created: function() {
    this.timerUpdate();
  },
  data() {
    return {
      time: 10
    };
  },
  methods: {
    timerUpdate() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 1;
          this.timerUpdate();
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 1em;
  width: 1200px;
  max-width: 90vw;
  animation: appear 300ms ease;
}

h1 {
  padding: 0;
  margin: 0;
}

@media (max-width: 820px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
