<template>
  <div class="container" id='app'>     
    <Home v-if="play"  />
    <div v-else class="grid">
      <img class="img" style="max-height: 50vh;" src='./assets/quiz.svg' alt='Quiz Image'/>
      <img class="img" src='./assets/play-button.png' v-on:click="start()" alt='Start Button'/>
       <img class="img" src='./assets/leaderboard.svg' v-on:click="start()" alt='Start Button'/>
     </div>
  </div>
</template>
<script>
 import Home from './pages/Home.vue';
export default {
  name: "App",
  components: {
    Home
  },
  data(){
    return({
      play: false
    })
  },
  methods : {
    start(){
      this.play = true;
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
}

.container {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.options {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
  place-items: stretch;
  padding: 0;
}
  .img{
    max-width: 100%;
  }

  .grid{
    display: grid;
    padding: 1em;
    grid-gap: 1em;
    place-items: center;
  }


</style>