<template>
  <div class='lobby'>
    <h1 class='txt-primary txt-center'>
      Waiting for players to join...
    </h1>
    <div class='txt-center txt-md'><i class='fas fa-spinner spin txt-primary'></i></div>
    <div class='card player-panel'>
    <div class='bold txt-md'> Players Joined</div>
    <ul class='options'>
      <li v-for='(p, index) in players' :key='p' class='capitalize card player'>
         <span class='hide-on-mobile'>{{ index + 1}}. </span><img src='../assets/user1.png' class='avatar'> 
         <div class='txt-left'>{{ 
           p.name.length > nameLimit? `${p.name.substring(0,  nameLimit)}...`: p.name 
           }}</div>
      </li>
    </ul>
      </div>
    <button @click='startVoting' class='btn-option btn-primary bold' :style='{fontSize: `1em`}'>Start Quiz!</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Lobby',
  computed: mapGetters(['players']),

  data: function() {
    return {
      dots: 3,
      nameLimit: 10
    };
  },
  methods: {
    ...mapActions(['startVoting']),
    timerUpdate() {
      if (this.dots > 0) {
        setTimeout(() => {
          this.dots -= 1;
          this.timerUpdate();
        }, 1000);
      } else {
        this.dots = 3;
        this.timerUpdate();
      }
    },
  },
  created: function() {
    this.timerUpdate();
  },
};
</script>

<style scoped>
.options {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: .5em;
  place-items: stretch;
}

.lobby {
  width: 100%;
  display: grid;
  box-sizing: border-box;
  grid-gap: 1em;
  place-items: stretch;
  padding: 1em;
}
h1{
 margin: .5em;
}
.player {
  display: grid;
  place-items: center stretch;
  padding: .25em .5em;
  grid-gap: .5em;
  grid-template-columns: auto auto 1fr;
}
.player-panel{
   background-image: linear-gradient(to right, rgb(255,255,255, 0.95) 0%, rgb(255,255,255,0.75) 100%), url('../assets/lobby.svg');
   background-size: cover;
   background-repeat: no-repeat;
   background-position: left bottom;
   min-height: 40vh;
   background-size: 50%;
}

@media (max-width: 480px){
  .options {
       grid-template-columns: 1fr;
    }
}
</style>
