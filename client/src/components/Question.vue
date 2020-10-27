<template>
<div class="wrapper">
  <h1 class="txt-center">{{ time.toFixed(0) }}</h1>
  <div :class="animate ? 'appear' : ''">
    <h1>{{ question.question }}</h1>
    <ul class="options">
      <li v-for="(option, index) in question.choices" :key="option">
        <button @click="submit(index)" class="btn-option">
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
        this.submit();
        this.timerUpdate();
      }
    },
    className() {},
    submit(i = 0) {
      this.vote(i);
      this.animate = true;
      this.time = 10;
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 1em;
  width: 1200px;
  max-width: 90vw;
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
