import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'mavon-editor/dist/css/index.css'
import marked from 'marked'
import './assets/scss/icon.scss'

Vue.config.productionTip = false

Vue.use(vuetify)
Vue.prototype.$markdown = marked
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
