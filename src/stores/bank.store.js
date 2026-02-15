import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/bank'

import {useAlertStore} from  './alert.store'


export const useBankStore = defineStore('bank',()=>{
    const loading  = ref(false);
    const data = ref([]);

    async function getAll(){
        try{    
            loading.value = true
            const response = await api.GetAllBanks();
            
            if(response.data.success){
                data.value = response.data.data;
                loading.value = false;
            }
            loading.value = false;

        }catch(error){
            loading.value = false;
            useAlertStore().failureMessage(error.message)
        }
    }



    return {getAll,data,loading}
})