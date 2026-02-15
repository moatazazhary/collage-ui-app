import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/department'
import { useAuthError } from "../composables/useAuthError";
import { useAlertStore } from "./alert.store";

const {expireError} = useAuthError();

export const useDepartmentStore = defineStore('department',()=>{
    const loading = ref(false);
    const data = ref([]);

    async function getAll(){
        try{
            loading.value = true;
            const response = await api.GetAllDepartments();

            if(response.data.success){
                data.value = response.data.data;
                loading.value = false;
                return;
            }
            loading.value = false
        }catch(error){
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    return {loading,data,getAll}
})