import { createApp } from 'vue';
import App from './App.vue'; // This is your root component
import AppMessages from './components/AppMessages.vue'; // Your AppMessages component

const app = createApp(App);

//app.component('AnneeAcademique', AnneeAcademique);
app.component('AppMessages', AppMessages);

// Mount the Vue app to the #app element
app.mount('#app');
