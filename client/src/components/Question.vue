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
  name: "Question",
  props: {
   data: String
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
