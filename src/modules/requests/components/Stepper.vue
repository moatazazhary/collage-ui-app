<script setup >
import { onMounted, reactive } from 'vue';
import { useDegreeStore } from '../../../stores/degree.store';
import { useStepperStore } from '../../../stores/stepper.store';
import FilesUploadStep from './FilesUploadStep.vue';
import PaymentStep from './PaymentStep.vue';
import PersonalInfoStep from './PersonalInfoStep.vue';
import { useAuthStore } from '../../../stores/authStore';
import Loading from '../../core/components/Loading.vue';



const auth = useAuthStore();
const degree = useDegreeStore();
const stepper = useStepperStore();

const degreeRequest = reactive({
    personalInfo : '',
    photos :'',
    payment:''
});





async function nextStep(data){
    if(data){
        switch(stepper.currentStep){
            case 1 : 
                degreeRequest.personalInfo = data;
                break;
            case 2 : 
                degreeRequest.photos = data;
                break;
            case 3 : 
                degreeRequest.payment = data;
                break;
            default :
                return;
        }

        stepper.nextStep();

        if(stepper.currentStep > 3 ){
            const formData = new FormData();
            
            formData.append("fullnameEnglish",degreeRequest.personalInfo?.fullnameEnglish)
            formData.append("certificateType",degreeRequest.personalInfo?.certificateType)
            formData.append("bankId",degreeRequest.payment?.bankId)
            formData.append("userId",auth.user.userId)
            degreeRequest.personalInfo?.degreeTypes?.forEach((type)=>{
                formData.append('degreeTypeIds[]',type)
            });

            formData.append("personalPhoto",degreeRequest.photos?.personalPhoto)
            formData.append("idCardPhoto",degreeRequest.photos?.idPhoto)
            formData.append("paymentPhoto",degreeRequest.payment?.paymentPhoto)

            await degree.requestDegree(formData);

            stepper.currentStep = 1;
        }

    }
}


</script>

<template>
    <div class="flex items-center justify-center p-3 rounded-lg shadow-lg shadow-lgiht">
        <div :class="{'step-start':stepper.currentStep === 1,'step-end':stepper.currentStep > 1}" class=" text-black-200 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black-200">
            <i class="bx text-xl"  :class="{'bx-id-card':stepper.currentStep <= 1,'bx-check':stepper.currentStep > 1}"></i>
        </div>
        <span :class="{'step-start-bar':stepper.currentStep === 1,'step-end':stepper.currentStep > 1}" class=" w-14 h-0.5 bg-black-200"></span>
        <div :class="{'step-start':stepper.currentStep === 2,'step-end':stepper.currentStep > 2}" class=" text-black-200 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black-200">
            <i class="bx text-xl"  :class="{'bx-file':stepper.currentStep <= 2,'bx-check':stepper.currentStep > 2}"></i>
        </div>
        <span :class="{'step-start-bar':stepper.currentStep === 2,'step-end':stepper.currentStep > 2}" class=" w-14 h-0.5 bg-black-200"></span>
        <div :class="{'step-start':stepper.currentStep === 3,'step-end':stepper.currentStep > 3}" class=" text-black-200 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black-200">
            <i class="bx text-xl"  :class="{'bx-money':stepper.currentStep <= 3,'bx-check':stepper.currentStep > 3}"></i>
        </div>
    </div>

    


    <Loading v-if="degree.loading"></Loading>
    <PersonalInfoStep :nextStep="nextStep" v-if="stepper.currentStep === 1"></PersonalInfoStep>

    <FilesUploadStep :nextStep="nextStep" v-if="stepper.currentStep === 2"></FilesUploadStep>

    <PaymentStep :nextStep="nextStep" v-if="stepper.currentStep === 3"></PaymentStep>


</template>

<style scoped>
    .step-start{
        color: var(--color-primary);
        border-color: var(--color-primary);
    }
    .step-start-bar{
        background-color: var(--color-primary);
    }
    .step-end{
        color: white;
        background-color: #009689;
        border-color: #009689;
    }

    .active{
        animation: show .3s ease-in-out linear both;
    }

    @keyframes show {
        from{
            transform: translateY(10px);
            opacity: 0;
        }to{
            transform: translateY(10px);
            opacity: 1;
        }
    }
</style>