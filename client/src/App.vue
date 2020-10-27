<template>
  <div class="container" id="app" v-bind:style="styleObject">
     <router-view />
  </div>
</template>

<script>
import Games from "./assets/games.svg";

const gradient = (
  color1 = "rgb(240,243,244, 0.95)",
  color2 = "rgb(240,243,244,0.95)"
) => `linear-gradient(to right, ${color1} 0%, ${color2} 100%)`;

export default {
  name: "App",
  data() {
    return {
      play: false,
      styleObject: {
        backgroundImage: `${gradient()}, url("${Games}")`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom left",
      },
    };
  },
};
</script>

<style>
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
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
  .img {
    max-width: 100%;
  }

  button, input, .card {
    border-radius: .25em;
    outline: none;
    border-width: 0;
    padding: .75em;
    box-shadow: 0 1px 3px rgba(10, 20, 10, 0.15), 0 1px 2px rgba(0, 0, 0, 0.22);
    background: white;
  }
 .capitalize {
  text-transform: capitalize;
 }
  .card {
    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none; 
  }

  button {
    cursor: pointer;
  }

  input{
    width: 100%;
    box-sizing: border-box;
  }

  button:hover {
    box-shadow: 0 0 0;
    transition: 200ms ease;
  }
  .grid {
    display: grid;
    padding: 1em;
    grid-gap: 1em;
    place-items: center;
  }

  .txt-center {
    text-align: center;
  }

  .txt-lg{
    font-size: 2em;
  }

   .txt-md{
    font-size: 1.5em;
  }

  .bold {
    font-weight: bold;
  }

  .btn-option {
    width: 100%;
    padding: 1em;
  }

  .txt-primary{
    color: teal;
  }
  .spin {
  animation: spin 900ms linear infinite;
}

  .appear {
  animation: appear 300ms ease;
} 

.avatar {
  border-radius: 50%;
  width: 50px;
}

  @-moz-keyframes spin {
      from { -moz-transform: rotate(0deg); }
      to { -moz-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
      from { -webkit-transform: rotate(0deg); }
      to { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }
  @-moz-keyframes appear {
    0% { -moz-transform: scale(0.5); }
    100% { -moz-transform: scale(1); }
  }
  @-webkit-keyframes appear {
      0% {  -webkit-transform: scale(0.5); }
    100% { -webkit-transform: scale(1); }
  }

  @keyframes appear {
    0% { transform: scale(0.5); }
    100% { transform: scale(1); }
  }
</style>
