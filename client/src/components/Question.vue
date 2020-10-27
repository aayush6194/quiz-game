<template>
  <div class="wrapper">
    <div class='bold txt-md'>Question 1/10</div>
    <div class="txt-right bold txt-lg">
      <span> <i class="fas fa-stopwatch" /> {{ time.toFixed(0) }} </span>
    </div>
    <div :class="animate ? 'appear' : ''">
      <h1 class="txt-center">{{ question.question }}</h1>
      <ul class="options">
        <li v-for="(option, index) in question.choices" :key="option">
          <button @click="submit(index)" :class="buttonClassName(index)">
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
    data: String,
    question: [],
    vote: Function
  },
  created: function() {
    this.timerUpdate();
  },
  data() {
    return {
      selectedAnswer: -1,
      time: 10,
      animate: true
    };
  },
  methods: {
    timerUpdate() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 0.5;
          if (this.time == 9.5) {
            this.animate = false;
          }
          this.timerUpdate();
        }, 500);
      } else if (this.time === 0) {
        this.submit(undefined);
        this.timerUpdate();
      }
    },
    buttonClassName(index) {
      return (this.selectedAnswer === index)? 'btn-option txt-md bold select': 'btn-option txt-md bold';
    },
    submit(i) {
      if (i !== undefined) {
        this.vote(i);
      }
      this.animate = true;
      this.time = 10;
    }
  }
};
</script>

<style scoped>

.btn-option {
  border: 2px solid transparent;
}

.btn-option:hover, .select {
  border-color:#7fab96;
  box-shadow: 2px 2px 5px rgba(42, 109, 42, 0.15),
    1px 2px 2px rgba(15, 102, 29, 0.22);
}
.wrapper {
  padding: 1em;
  width: 1400px;
  max-width: 90vw;
}

h1 {
  margin: 1em;
}

.timer {
  border-radius: 1em;
  border: 2px solid;
  padding: 0.2em;
}

@media (max-width: 768px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
