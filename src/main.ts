import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './assets/iconfont/iconfont.css'
import router from './router'
import * as directives from './directives'
const app = createApp(App);

for (const key of Object.keys(directives)) {
  app.directive(key.toLowerCase(), directives[key])
}

app.use(router).mount('#app')
