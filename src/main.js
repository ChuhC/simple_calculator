import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

// 添加以下全局配置
Vue.prototype.$meta = {
  showTabBar: () => false
}
