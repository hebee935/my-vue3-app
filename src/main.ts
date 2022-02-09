import { createApp } from 'vue';
import VueCookies from 'vue3-cookies';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts()

library.add(fas);

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(VueCookies, {
    expireTimes: '30d',
    path: '/',
    secure: true,
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
