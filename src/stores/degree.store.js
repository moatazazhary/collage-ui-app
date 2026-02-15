import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from '../api/degree'
import {useAlertStore} from './alert.store'
import { useAuthError } from "../composables/useAuthError";
import { useRouter } from "vue-router";

const {expireError} = useAuthError();

export const useDegreeStore = defineStore('degree',()=>{
    const loading = ref(false);
    const requestsData = ref([]);
    const data = ref([]);
    const files = reactive({
        personalPhoto:'',
        idPhoto:'',
        paymentPhot:''
    });

    const router = useRouter();

    const totalData = ref(0);
    const currentPage = ref(0);
    const totalPages = ref(0);

    const bill = ref(0);


     async function getAll({page =1,limit=10,sort='asc'}={}){
        try{
            loading.value = true;
            const response = await api.GetAllRequests({
                page,
                limit,
                sort
            });

            if(response.data.success){

                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                requestsData.value = response.data.data;
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

    async function getUserDegreeRequests(){
        try{
            loading.value = true;
            const response = await api.GetUserDegreeRequests();
            if(response.data.success){
                loading.value = false;
                return response.data.data;
            }
            loading.value = false
        }catch(error){
            console.log('error : ',error.response)
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    async function getAllDegreeTypes(){
        try{
            loading.value = true
            const response = await api.getAllDegreeTypes();

            if(response.data.success){
                data.value = response.data.data;
                loading.value = false;
            }
            loading.value = false;

        }catch(error){
            if(error.response.data?.message){
                expireError(error);
                loading.value = false
            }else{
                useAlertStore().failureMessage(error.message);
                loading.value = false;
            }
        }
    }


    async function requestDegree(request){
        try{

            loading.value = true;
            const response = await api.RequestDegree(request);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                router.replace('/degree-apply');
                return;
            }
            loading.value = false;
        }catch(error){
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    async function approve(id,request){
        try{

            loading.value = true;
            const response = await api.Approve(id,request);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                
                return {status:response.data?.data.status,notes:response.data?.data.notes};
            }
            loading.value = false;
        }catch(error){
           
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    async function open(id){
        try{

            loading.value = true;
            const response = await api.Open(id);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                
                return response.data.data ?? '';
            }
            loading.value = false;
        }catch(error){
           
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    async function reject(id,request){
        try{

            loading.value = true;
            const response = await api.Reject(id,request);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                
                return {status:response.data?.data.status,notes:response.data?.data.notes};
            }
            loading.value = false;
        }catch(error){
           
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }


    async function getDegreeRequest(id){
        try{
            loading.value = true;
            const response = await api.GetRequest(id);

            if(response.data.success){
                loading.value = false;
                return response.data.data
            }
            loading.value = false
        }catch(error){
            console.log('error :',error.response)
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error);
            }
        }
    } 



    return {files,data,loading,requestsData,totalData,totalPages,currentPage,bill,getUserDegreeRequests,getAllDegreeTypes,getDegreeRequest,requestDegree,getAll,open,reject,approve}
})