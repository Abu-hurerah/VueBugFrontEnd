<template>
  <div id="app">
    <!-- <Navigationbar></Navigationbar> -->
    <router-view></router-view>
  </div>
</template>

<script>
//import Navigationbar from './components/Navigationbar.vue';

export default {
  name: 'App',
  components: {
    //Navigationbar
  },
  mounted(){
    console.log("Loaded")
  }
}
</script>

<style scoped>
.background {
  background-color: aliceblue;
}
</style>
