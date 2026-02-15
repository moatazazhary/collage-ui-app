import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore('alert',()=>{
    const message = ref('');
    const iconClass = ref('');
    const alertClass = ref('');

    const activeClass = ref('')
    const isActive = ref(false);

    function successMessage(theMessage = 'تم بنجاح'){
        message.value = theMessage;
        iconClass.value = 'bx-check-circle';
        alertClass.value = 'text-success bg-success-light'
        
        isActive.value = true;
        activeClass.value = 'active';

        toggleActive();
    }

    function warringMessage(theMessage = 'لا يمكن عمل هذا الاجراء'){
        message.value = theMessage;
        iconClass.value = 'bx-info-circle';
        alertClass.value = 'text-alertText-yellow bg-alertback-yellow'
        
        isActive.value = true;
        activeClass.value = 'active';

        toggleActive();
    }

    function failureMessage(theMessage = 'حدث خطأ ما'){
        message.value = theMessage;
        iconClass.value = 'bx-x-circle';
        alertClass.value = 'text-alertText-red bg-alertback-red'
        
        isActive.value = true;
        activeClass.value = 'active';

        toggleActive();
    }


    function toggleActive(){
        setTimeout(() => {
            activeClass.value = 'un-active'
            setTimeout(() => {
                isActive.value = false
            }, 300);
        }, 1800);
    }

    return {message,isActive,activeClass,iconClass,alertClass,successMessage,failureMessage,warringMessage}
})