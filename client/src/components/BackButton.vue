<template>
  <button class='btn-back' @click='goBack'>
      <i class='fa fa-chevron-left txt-primary'/>
  </button>
</template>

<script>
// Circular Back bottom placed abolute to go back a page
export default {
  name: 'BackButton',
  props: {
    goBack: Function 
  }
};
</script>

<style scoped>
    .btn-back{
        position: absolute;
        top: 1em;
        left: 1em;
        font-size: 1.5em;
        border-radius: 50%;
        padding: .15em .35em;
    }
</style>
