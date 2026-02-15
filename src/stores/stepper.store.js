import { defineStore } from "pinia";
import { ref } from "vue";

export const useStepperStore = defineStore('stepper',()=>{
    const currentStep = ref(1);

    function nextStep(){
        currentStep.value++
    }

    function resetSteps(){
        currentStep.value = 1;
    }

    return {currentStep,nextStep,resetSteps}
})