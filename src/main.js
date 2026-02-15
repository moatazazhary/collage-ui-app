import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './modules/index'
import { useAuthStore } from './stores/authStore'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);


const auth = useAuthStore();

const loader = document.getElementById('app-loader');

await auth.checkSession();
if(loader) loader.remove();

if(auth.isAdmin){
    router.replace('/admin')
}else{
    router.replace('/')
}

app.mount('#app')
