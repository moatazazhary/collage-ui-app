import axios from 'axios'
import { useRouter } from 'vue-router';
import { useAuthError } from '../../composables/useAuthError';
import { useAuthStore } from '../../stores/authStore';

const BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true
});

api.interceptors.response.use(response => response,error =>{
    const router = useRouter();
    if(error.response && error.response.status === 403){
        useAuthStore().allowRoute('Access Denied')
        return router.replace({name:'Access Denied',state:{allowrd:true}});
    }
    if(error.response && error.response.status ===404)
        if(error.config.url === '/auth/me')
            return {data : {authentecated:false}}

    if(error.response && error.response.status ===401)
        if(error.config.url === '/auth/me')
            return {data : {authentecated:false}}

    if(error.response && error.response.status ===401){
        if(error.response.data.error){
            useAuthError().expireError(error)
            router.replace('/login');
        }
    }

    return Promise.reject(error);
})

export default api;