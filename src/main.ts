import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'
import * as directives from './directives'
const app = createApp(App);
console.log(directives)

for (const key of Object.keys(directives)) {
  app.directive(key.toLowerCase(), directives[key])
}

console.log(app)

app.use(router).mount('#app')
