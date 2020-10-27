<template>
  <div class='wrapper card'>
    <router-link to='/'>
      <BackButton />
    </router-link>
    <div class='txt-primary txt-center txt-lg bold'>Scores</div>
    <div class='score card' >
      <img class='img' src='../assets/prize.svg' :style='{ width: `150px` }' />
      <div class='txt-md bold' :style='{placeSelf: `center`}'>
        Your Score
        <div class='txt-md txt-left'>10</div>
      </div>
    </div>

    <ul class='results'>
      <li v-for='(data, index) in results' :key='data.player'>
        <div class='result card no-select'>
          <div class='txt-md bold'>{{ index + 1 }}.</div>
          <img class='img avatar'  src='../assets/user1.png'/>
          <div class='capitalize'>{{ data.player.name }}</div>
          <div class='txt-primary txt-md bold'>
            {{ data.right }}
            <span class='txt-lg'>/</span>
            {{ data.right + data.wrong }}
          </div>
        </div>
      </li>
    </ul>
    <button class='btn-primary bold' :style='{fontSize: `1.2em`}'>
        Play Again
    </button>
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Result',
  components: {
    BackButton,
  },
  // props: function (){
  //   return{ results: [ ]}
  // },
 computed: mapGetters(['results']),
  methods: {
    setPlayer: function(gender) {
      this.player = { gender };
    },

    resetPlayer: function() {
      this.player = { gender: undefined };
    },
    socket: function() {
      const con = new WebSocket('ws://localhost:8082');

      con.onmessage = (event) => {
        this.data = JSON.parse(event?.data);
      };

      con.onopen = function(event) {
        console.log(event);
      };
    },
  },
  created: function() {
    this.socket();
  },
};
</script>

<style scoped>
.wrapper {
  place-self: center;
  place-items: stretch;
  display: grid;
}

.score,
.result,
.results,
.option {
  display: grid;
  grid-gap: 1em;
  place-items: center stretch;
}
.results {
  list-style: none;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(12, auto);
  min-height: 50vh;
  width: 400px;
  place-items: start stretch;
  padding: 0;
}
.score{
   grid-template-columns: auto 1fr;
}
.result {
  grid-template-columns: auto auto 1fr auto;
}
</style>