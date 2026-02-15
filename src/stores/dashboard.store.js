import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/dashboard'
import { useAuthError } from "../composables/useAuthError";
import {useAlertStore} from  './alert.store'
const {expireError} = useAuthError();

export const useDashboardStore = defineStore('dashboard',()=>{
    const loading  = ref(false);
    const data = ref([]);

    async function getKpis(){
        try{    
            loading.value = true
            const response = await api.OverView();
            
            if(response.data.success){
                loading.value = false;
                return response.data.kpis;
            }
            loading.value = false;

        }catch(error){
            loading.value = false;
            if(error.response.data?.message){
                expireError(error);
                loading.value = false
            }else{
                useAlertStore().failureMessage(error.message);
                loading.value = false;
            }
        }
    }

    async function getFileStatusSummary(){
        try{    
            loading.value = true
            const response = await api.FileStatusSummary();
            
            if(response.data.success){
                loading.value = false;
                return response.data.summary;
            }
            loading.value = false;

        }catch(error){
            console.log('error : ',error.response)
            loading.value = false;
            if(error.response.data?.message){
                expireError(error);
                loading.value = false
            }else{
                useAlertStore().failureMessage(error.message);
                loading.value = false;
            }
        }
    }

    async function getDegreeStatusSummary(){
        try{    
            loading.value = true
            const response = await api.DegreeStatusSummary();
            
            if(response.data.success){
                loading.value = false;
                return response.data.summary;
            }
            loading.value = false;

        }catch(error){
            console.log('error : ',error.response)
            loading.value = false;
            if(error.response.data?.message){
                expireError(error);
                loading.value = false
            }else{
                useAlertStore().failureMessage(error.message);
                loading.value = false;
            }
        }
    }

     async function getFileActivitySummary(){
        try{    
            loading.value = true
            const response = await api.FileActivitySummary();
            
            if(response.data.success){
                loading.value = false;
                return response.data.summary;
            }
            loading.value = false;

        }catch(error){
            console.log('error : ',error.response)
            loading.value = false;
            if(error.response.data?.message){
                expireError(error);
                loading.value = false
            }else{
                useAlertStore().failureMessage(error.message);
                loading.value = false;
            }
        }
    }

    return {data,loading,getKpis,getFileStatusSummary,getDegreeStatusSummary,getFileActivitySummary}
})