import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/student'
import { useAuthError } from "../composables/useAuthError";
import { useAlertStore } from "./alert.store";
import { useModalStore } from "./modal.store";

const {expireError} = useAuthError();

export const useStudentStore = defineStore('student',()=>{
    const loading = ref(false);
    const studentData = ref([]);
    const totalData = ref(0);
    const currentPage = ref(0);
    const totalPages = ref(0);

    async function addStudent(data){
        try{
            loading.value = true;
            const response = await api.create(data);

            if(response.data.success){
                loading.value = false;
                studentData.value.push(response.data.data);
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

    async function updateStudent(id,data){
            try{
                loading.value = true;
                const response = await api.update(id,data);
    
                if(response.data.success){
                    loading.value = false;
                    const index = studentData.value.findIndex(s=>s.id === response.data.data.id  )
                    
                    console.log('index : ',index);
                    if(index !== -1){
                        studentData.value[index] =response.data.data;
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
            const response = await api.GetAllStudents({
                page,
                limit,
                sort
            });

            if(response.data.success){
                totalData.value = response.data.totalData;
                currentPage.value = response.data.currentPage;
                totalPages.value = response.data.totalPages;
                studentData.value = response.data.data;
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

    async function getStudent(id){
        try{
            loading.value = true;
            const response = await api.GetStudent(id);

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

    return {loading,studentData,totalData,totalPages,currentPage,getAll,getStudent,addStudent,updateStudent}
})