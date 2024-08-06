import Vue from 'vue'
import App from './App.vue' // Use relative path from current file
import router from './router/index' // Ensure correct relative path
import VueResource from 'vue-resource'
import 'primevue/resources/themes/saga-blue/theme.css';        //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'; // Make sure this path is correct

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(PrimeVue);

new Vue({
  router, // Add the router instance here
  render: h => h(App),
}).$mount('#app')
