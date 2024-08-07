<template>
  <div id="app">
    <Toast position="top-right" />
    <!-- <Navigationbar></Navigationbar> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Toast from 'primevue/toast/Toast';

//import Navigationbar from './components/Navigationbar.vue';

export default {
  name: 'App',
  components: {
    Toast
  },
  mounted(){
    console.log("Loaded")
  },
}
</script>

<style scoped>
.background {
  background-color: aliceblue;
}
</style>
