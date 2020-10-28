<template>
  <div class="wrapper" v-if='!voted'>
    <div class="bold txt-md">Question 1/10</div>
    <div class="txt-right bold txt-lg">
      <span> 
        <i class="fas fa-stopwatch" /> 
        <Timer :defaultTime='time'/> 
        {{ time.toFixed(0) }} 
      </span>
    </div>
    <div :class='`appear`'>
      <h1 class="txt-center">{{ question.question }}</h1>
      <ul class="options">
        <Option 
           v-for="(option, index) in question.choices"
          :index='index' 
          :text='option.value'
          :key="option"
          :handleSubmit='submit'
        />
      </ul>
    </div>
    <ProgressBar :percent='time'/>
  </div>
  <Result v-else/>
</template>

<script>
import ProgressBar from './ProgressBar';
import Option from './Option';
import Result from './Result';

export default {
  name: "Question",
  components: {
    ProgressBar,
    Option,
    Result
  },
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
      voted: false,
    };
  },
  methods: {
    timerUpdate() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 0.5;
          if (this.time == 10) {
          this.voted = false;
          }
          this.timerUpdate();
        }, 500);
      } else if (this.time === 0) {
        this.submit(undefined);
        this.timerUpdate();
      }
    },
    submit(i) {
      if (i !== undefined) {
        this.vote(i);
      }
      this.voted = true;
      this.time = 12;
    }
  }
};
</script>

<style scoped>
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
