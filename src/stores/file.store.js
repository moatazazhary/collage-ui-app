import { defineStore } from "pinia";
import {  ref } from "vue";
import api from '../api/file'
import {useAlertStore} from './alert.store'
import { useAuthError } from "../composables/useAuthError";

const {expireError} = useAuthError();

export const useFileStore = defineStore('file',()=>{
    const loading = ref(false);
    const filesData = ref([]);
    const data = ref([]);
    const searchData = ref([]);
    const totalData = ref(0);
    const currentPage = ref(0);
    const totalPages = ref(0);

    async function getAll({page =1,limit=10,sort='asc'}={}){
        try{
            loading.value = true;
            const response = await api.GetAll({
                page,
                limit,
                sort
            });

            if(response.data.success){

                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                filesData.value = response.data.data;
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
    async function getUserRequests(){
        try{
            loading.value = true;
            const response = await api.GetUserRequests();
            if(response.data.success){
                loading.value = false;
                return response.data.data;
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

    async function approve(id){
        try{

            loading.value = true;
            const response = await api.Approve(id);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                return response.data?.data;
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

    async function reject(id,status){
        try{

            loading.value = true;
            const response = await api.Reject(id,status);
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;

                return response.data?.data
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


    async function getFile(id){
        try{
            loading.value = true;
            const response = await api.GetFile(id);

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

    async function uploadFile(data){
        try{
            loading.value = true;
            const response = await api.uploadFile(data);
            
            if(response.data.success){
                await getUserFiles();
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                return;
            }

        }catch(error){
            loading.value = false
            if(error.response.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error);
            }
        }
    }

    async function getUserFiles(){
        try{
            loading.value = true;
            const response = await api.getUserFiles();

            if(response.data.success){

                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                filesData.value = response.data.data;
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


    async function search({search=null,departments=null,page =1,limit=10,sort='asc'}){
        try{
            loading.value = true;
            const response = await api.search({
                search,
                departments:departments,
                page,
                limit,
                sort
            });

            if(response.data.success){

                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                searchData.value = response.data.data;
                loading.value = false;
                return;
            }
            loading.value = false
        }catch(error){
            loading.value = false
            console.log('error from : ',error)
            if(error.response?.data?.message){
                expireError(error);
                
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    return {loading,filesData,searchData,totalData,totalPages,currentPage,getAll,getFile,getUserRequests,open,reject,approve,search,uploadFile,getUserFiles}
})