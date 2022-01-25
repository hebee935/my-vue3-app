import { createApp } from 'vue';
import BootstrapVue from 'bootstrap-vue-3';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(BootstrapVue);
app.use(router);
app.use(store);
app.component("modal", {
    template: "#modal-template"
});
app.mount('#app');
