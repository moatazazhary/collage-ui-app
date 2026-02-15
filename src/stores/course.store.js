import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/course'
import { useAuthError } from "../composables/useAuthError";
import { useAlertStore } from "./alert.store";
import { useModalStore } from "./modal.store";

const {expireError} = useAuthError();

export const useCourseStore = defineStore('course',()=>{
    const loading = ref(false);
    const coursesData = ref([]);
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
                coursesData.value = response.data.data;
                loading.value = false;
                return;
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

    async function getCourseByDepartment({departmentId,semesterNum}={}){
        try{
            loading.value = true;
            const response = await api.GetAllByDepartment({departmentId,semesterNum});

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
                useAlertStore().failureMessage(error);
            }
        }
    }

    async function getUserCourses(){
        try{
            loading.value = true;
            const response = await api.getUserCourses();

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
                useAlertStore().failureMessage(error);
            }
        }
    }

    async function getCourse(id){
        try{
            loading.value = true;
            const response = await api.GetCourse(id);

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
    async function getCourseDetails(id){
        try{
            loading.value = true;
            const response = await api.GetCourseDetails(id);

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

    async function updateCourse(id,data){
        try{
            loading.value = true;
            const response = await api.update(id,data);

            if(response.data.success){
                loading.value = false;
                const index = coursesData.value.findIndex(s=>s.id === response.data.data.id  )
    
                if(index !== -1){
                    coursesData.value[index] =response.data.data;
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

    async function addCourse(data){
        try{
            loading.value = true;
            const response = await api.create(data);

            if(response.data.success){
                loading.value = false;
                coursesData.value.push(response.data.data);
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

    async function addLecture(data){
        try{
            loading.value = true;
            const response = await api.CreateLecture(data);

            if(response.data.success){
                loading.value = false;
                return response.data.data;
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

    return {loading,coursesData,totalData,totalPages,currentPage,getAll,getCourse,updateCourse,getCourseDetails,addCourse,addLecture,getUserCourses,getCourseByDepartment}
})