import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/doctor'
import { useAuthError } from "../composables/useAuthError";
import { useAlertStore } from "./alert.store";
import { useModalStore } from "./modal.store";

const {expireError} = useAuthError();

export const useDoctorStore = defineStore('doctor',()=>{
    const loading = ref(false);
    const doctorsData = ref([]);
    const totalData = ref(0);
    const currentPage = ref(0);
    const totalPages = ref(0);

    async function addDoctor(data){
        try{
            loading.value = true;
            const response = await api.create(data);

            if(response.data.success){
                loading.value = false;
                doctorsData.value.push(response.data.data);
                useAlertStore().successMessage(response.data.message);
                useModalStore().closeModal();
            }
            loading.value = false
        }catch(error){
            loading.value = false
            if(error.response.data?.message){
                
                expireError(error);
                
                
            }else{
                useAlertStore().failureMessage(error);
            }
        }
    }


    async function updateDoctor(id,data){
        try{
            loading.value = true;
            const response = await api.update(id,data);

            if(response.data.success){
                loading.value = false;
                const index = doctorsData.value.findIndex(d=>d.id === response.data.data.id  )
                
                console.log('index : ',index);
                if(index !== -1){
                    doctorsData.value[index] =response.data.data;
                }
                useAlertStore().successMessage(response.data.message);
                useModalStore().closeModal();
            }
            loading.value = false
        }catch(error){
            console.log('error : ',error.response)
            loading.value = false
            if(error.response.data?.message){
                
                expireError(error);
                
                
            }else{
                useAlertStore().failureMessage(error);
            }
        }
    }

    async function getAll({page =1,limit=10,sort='asc'}={}){
        try{
            loading.value = true;
            const response = await api.getAllDoctors({
                page,
                limit,
                sort
            });

            if(response.data.success){

                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                doctorsData.value = response.data.data;
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

    async function getDoctor(id){
        try{
            loading.value = true;
            const response = await api.GetDoctor(id);

            if(response.data.success){
                loading.value = false;
                return response.data.data
            }
            loading.value = false
        }catch(error){
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error);
            }
        }
    } 

    return {loading,doctorsData,currentPage,totalData,totalPages,getAll,getDoctor,addDoctor,updateDoctor}
})