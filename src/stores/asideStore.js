import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAsideStore = defineStore('aside',()=>{
    const isOpen = ref(false);
    const asideName = ref('');
    const isClose = ref(true);
    const activeClass = computed(()=>{
        return isOpen.value ? 'menu-active' : ''
    })
    function open(){
        isOpen.value = true;
    }
    function close(){
        isOpen.value = false;
        // setTimeout(() => {
        //     isOpen.value = false;
        // }, 200);
    }

    return {isOpen,activeClass,asideName,open,close}
})