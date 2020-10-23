<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Question question="tick"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Question from './components/Question.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Question
  }
}
</script>

<style>

</style>