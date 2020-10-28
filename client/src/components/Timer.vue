<template>
   {{ time }}
</template>

<script>
export default {
  name: "Timmer",
  props: {
    onFinish: Function,
    defaultTime: Number
  },
  data() {
    return {
      time: this.defaultTime
    };
  },
  methods: {
    timerUpdate() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 1;
          this.timerUpdate();
        }, 1000);
      } else {
        this.onFinish && this.onFinish();
      }
    }
  },
  created: function() {
    this.timerUpdate();
  }
};
</script>
