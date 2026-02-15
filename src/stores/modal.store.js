import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useModalStore = defineStore('modal',()=>{
    const modalName = ref('');
    const IsActive = ref(false);

    function closeModal(){
        IsActive.value = false;

        setTimeout(() => {
            modalName.value = ''
        }, 300);
    }

    function toggleModal(name){

        modalName.value = name;
        IsActive.value = true;

    }



    return {modalName,IsActive,closeModal,toggleModal}
})