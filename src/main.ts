import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './index.css'


const pinia = createPinia();
const app = createApp(App)
app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
    }
  }
})

app.mount('#app')
