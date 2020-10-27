<template>
  <div class='container' id='app' v-bind:style='styleObject'>
     <router-view />
  </div>
</template>

<script>
import Games from './assets/games.svg';

const gradient = (
  color1 = 'rgb(240,243,244, 0.95)',
  color2 = 'rgb(240,243,244,0.95)'
) => `linear-gradient(to right, ${color1} 0%, ${color2} 100%)`;

export default {
  name: 'App',
  data() {
    return {
      styleObject: {
        backgroundImage: `${gradient()}, url('${Games}')`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom left',
      },
    };
  }
};
</script>

<style>
  @import url('./main.css');

</style>
