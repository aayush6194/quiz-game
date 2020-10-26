<template>
  <div class="wrapper appear">
    <div v-if="!getQuestion">
      <h1>Waiting for players</h1>
    </div>
    <div v-else>
      <h1>{{ getQuestion.question }}</h1>
      <ul class="options">
        <li v-for="option in getQuestion.choices" :key="option">
          <button class="btn-option">
            {{ option.value }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    data: String
  },
  computed: {
    getQuestion() {
      console.log(this.$store.getters.getQuestionUnderVote);
      return this.$store.getters.getQuestionUnderVote;
    }
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

@keyframes appear {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
h1 {
  padding: 0;
  margin: 0;
}

.btn-option {
  width: 100%;
  padding: 1em;
}

@media (max-width: 820px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
