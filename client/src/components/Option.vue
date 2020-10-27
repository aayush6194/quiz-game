<template> 
        <li>
          <button @click="handleSubmit(index)" :class="buttonClassName(index)">
            <span class="index">{{ String.fromCharCode(65 + index) }}.</span>
            <span> {{ text }}</span>
          </button>
        </li>
</template>

<script>
export default {
  name: "Option",
  props: {
    handleSubmit: Function,
    index: Number,
    text: String
  },
  data() {
    return {
      selectedAnswer: -1,
    };
  },
  methods: {
    buttonClassName(index) {
      const className = "btn-option txt-md bold btn-cols";
      return this.selectedAnswer === index ? `${className} select` : className;
    }
  }
};
</script>

<style scoped>
.btn-option {
  border: 2px solid transparent;
}

.index {
  border-radius: 50%;
  background: #648374;
  color: white;
  padding: 0.5em;
}
.btn-cols {
  display: grid;
  grid-gap: 0.5em;
  place-items: center stretch;
  grid-template-columns: auto 1fr;
}

.btn-option:hover,
.select {
  border-color: #7fab96;
  box-shadow: 2px 2px 5px rgba(42, 109, 42, 0.15),
    1px 2px 2px rgba(15, 102, 29, 0.22);
}

</style>
