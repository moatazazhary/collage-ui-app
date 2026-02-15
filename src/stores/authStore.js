import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {useAlertStore} from './alert.store'
import api from '../api/auth';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth',()=>{

    const user = ref(null);
    const isLoggedIn = ref(false);
    const loading = ref(false);
    const sessionChecked = ref(false);
    const isAdmin = ref(false);
    const isDoctor = ref(false);
    const isStudent = ref(false);
    const identifier = ref('');
    const router = useRouter();
    const allowRoutes = reactive(new Set());

    const getCurrentIdentifier = computed(()=>{
        return localStorage.getItem('identifier') === undefined ? null : localStorage.getItem('identifier')
    });
    async function login(userInfo){
        try{
            loading.value = true
            const response = await api.Login(userInfo.identifier,userInfo.password);
            if(response.data.success){
                if(response.data.firstLogin){
                    identifier.value = response.data.email && response.data.email !== null ? response.data.email : response.data.identifier ;
                    loading.value = false;
                    sessionChecked.value = true;
                    allowRoute('Send Verification')
                    router.push({
                        name:'Send Verification',
                        state:{allowed:true}
                    })
                    return {success : true ,message : ''}
                }

                const checkUser = await api.FetchProfile();
                if(checkUser.data?.authenticated){
                    user.value = checkUser.data?.data
                    isLoggedIn.value = true;
                } 
                loading.value = false;
                checkRole(user.value?.roles.map(r=>r.role.name))
                if(isAdmin.value){
                    return router.replace('/admin')
                }
                return router.replace('/')
            }else{
                useAlertStore().failureMessage(response.data.message)
                loading.value = false
                return {success : false ,message : response.data.message}
            }
        }catch(error){
            if(error.response?.data?.message){
                useAlertStore().failureMessage(error.response.data?.message)
                loading.value = false
                return {success : false ,message : error.response.data?.message}
            }else
                console.error(error);
                loading.value = false
                return {success : false , message : 'هنالك خطأ'}
        }
    }


    async function sendOTP(identy,email){
        try{
            loading.value = true
            const response = await api.SendOTP(identy,email);
            if(response.data.success){
            
                loading.value = false;
                identifier.value = response.data.email
                allowRoute('Verification')
                router.push({
                    name:'Verification',
                    state:{allowed:true}
                    });

            }else{
                useAlertStore().failureMessage(response.data.message)
                loading.value = false
            }
        }catch(error){
            console.log('error : ',error.response)
            if(error.response?.data?.message){
                useAlertStore().failureMessage(error.response.data?.message)
                loading.value = false
                return {success : false ,message : error.response.data?.message}
            }else
                console.error(error);
                loading.value = false
        }
    }

    async function verifyOTP(otp,email){
        try{
            loading.value = true
            const response = await api.VerifyOTP(otp,email);
            if(response.data.success){

                loading.value = false;
                identifier.value = response.data.email
                allowRoute('Set Password')
                router.push({
                    name:'Set Password',
                    state:{allowed:true}
                });

            }else{
                useAlertStore().failureMessage(response.data.message)
                loading.value = false
            }
        }catch(error){
            if(error.response.data?.message){
                useAlertStore().failureMessage(error.response.data?.message)
                loading.value = false
                return {success : false ,message : error.response.data?.message}
            }else
                console.error(error);
                loading.value = false
        }
    }

    async function setPassword(email,password,confirmPassword){
        try{
            loading.value = true
            const response = await api.ResetPassword(email,password,confirmPassword);
            if(response.data.success){
                loading.value = false;
                identifier.value = '';
                useAlertStore().successMessage(response.data.message)
                router.replace('/login');

            }else{
                useAlertStore().failureMessage(response.data.message)
                loading.value = false
            }
        }catch(error){
            if(error.response.data?.message){
                useAlertStore().failureMessage(error.response.data?.message)
                loading.value = false
                return {success : false ,message : error.response.data?.message}
            }else
                console.error(error);
                loading.value = false
        }
    }

    async function changePassword(passwordSchema){
        try{
            loading.value = true
            const response = await api.ChangePassword(passwordSchema.oldPassword,passwordSchema.newPassword,passwordSchema.confirmPassword)
            if(response.data.success){
                useAlertStore().successMessage(response.data.message);
                loading.value = false;
                router.replace('/profile');
                return {success : true , message :''}
            }
            loading.value = false;
        }catch(error){
            loading.value = false;
           if(error.response.data?.message){
                expireError(error);
                return {success : false,message :error.response.data?.message}
            }else{
                useAlertStore().failureMessage(error.message);
            }
        }
    }

    async function logout(){
        try{
            const response = await api.Logout();
            if(response.data.success){
                isLoggedIn.value = false;
                user.value = null;
                router.replace('/login');
                useAlertStore().successMessage(response.data.message)
                // router.push('/login');
            }
        }catch(error){
            if(error.response.data?.message){
                useAlertStore().failureMessage(response.data.message)
            }else{
                useAlertStore().failureMessage('هنالك خطأ')
            }
        }
    }

    async function checkSession(){
        try{

            if(sessionChecked.value) return;

            sessionChecked.value = true

            const request = await api.FetchProfile();
            isAdmin.value = false;
            isDoctor.value = false;
            isStudent.value = false;

            if(request.data.authenticated){

                user.value = request.data.data;

                if(!getCurrentIdentifier){
                    localStorage.setItem('identifier',`${user.value.identifier}`);
                }
                if(getCurrentIdentifier !== user.value?.identifier){
                    localStorage.setItem('identifier',`${user.value.identifier}`);
                }  
                
                isLoggedIn.value = true;

                checkRole(user.value.roles.map(r=>r.role.name));
            }
        }catch(error){
            if(error.response.status === 401){
                user.value = null;
                isLoggedIn.value = false;
                sessionChecked.value = false;
            }else{
                console.error('unexpected error',error)
            } 
        }
    }

    function checkRole(roles){

        isAdmin.value = false;
        isDoctor.value = false;
        isStudent.value = false;

        console.log('roles: ',roles)
        if(roles.includes('طالب'))
            isStudent.value = true;
        if(roles.includes('دكتور'))
            isDoctor.value = true;
        if(roles.includes('مسؤول'))
            isAdmin.value = true
    }


    function allowRoute(name){
        allowRoutes.add(name);
    }

    function consumeRoute(name){
        const allowed = allowRoutes.has(name);
        allowRoutes.delete(name);
        return allowed;
    }

    return {user,isLoggedIn,isAdmin,isStudent,identifier,isDoctor,loading,sessionChecked,getCurrentIdentifier,allowRoute,consumeRoute,setPassword,logout,verifyOTP,checkSession,login,sendOTP,changePassword}

})