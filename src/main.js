import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from 'vuetify'
import mavonEditor from 'mavon-editor'
import 'vuetify/dist/vuetify.min.css'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
