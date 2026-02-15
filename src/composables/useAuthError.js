import { useRouter } from "vue-router";
import router from "../modules/index";
import { useAlertStore } from "../stores/alert.store";
import { useAuthStore } from "../stores/authStore";
export function useAuthError(){
    function expireError(error){
        console.log('error :',error);

        // if(error.response.data && error.response.status === 403){
        //     router.replace('/access-denied');
        //     return;
        // }
        if(error.response.data && error.response.status === 404){
            useAuthStore().allowRoute('Not Found')
            router.replace({name:'Not Found',state:{allowrd:true}});
            return;
        }
        if(error.response.data.error && error.response.status === 401){
            useAuthStore().isLoggedIn = false;
            router.replace('/login');
            useAlertStore().failureMessage('انتهت صلاحية الجلسة');
            
            return;
        }else{

            useAlertStore().failureMessage(error.response.data.message);
        }
    }


    return {expireError}
}