import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { createProvider } from './vue-apollo'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  apolloProvider: createProvider(),
  store,
  router,
  render: h => h(App)
}).$mount('#app')
