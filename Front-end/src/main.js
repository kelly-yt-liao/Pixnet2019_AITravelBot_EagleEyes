import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import eventBus from './js/bus'

Vue.use(Vuetify, {
  theme: {
    eBlue: '#59BEC9',
    eGreen1: '#B1E4E3',
    eGreen2: '#3CDBC0',
    eRed: '#EF426F',
    eWhite: '#f0f4f4',
    eDark: '#1d1d1d',
    eOrange: '#F2AF5C'
  }
})
Vue.config.productionTip = false

new Vue({
  data() {
    return {
      bus: eventBus
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
