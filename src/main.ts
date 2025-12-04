import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/assets/main.css';
import Carousel from 'primevue/carousel';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import Slider from 'primevue/slider';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Configure PrimeVue first
app.use(PrimeVue);

app.component('Carousel', Carousel);
app.component('Slider', Slider);

app.mount('#app')
