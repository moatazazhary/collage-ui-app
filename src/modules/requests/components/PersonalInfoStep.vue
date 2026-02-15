<script setup>
import { useStepperStore } from '../../../stores/stepper.store';
import SubmitBtn from '../../core/components/SubmitBtn.vue';
import { reactive, ref,computed, onMounted } from 'vue';

import { useForm,useField } from 'vee-validate';
import { personalInfoStepSchema } from '../../../utils/validations/degreeValidations.js/personalInfoStep';
import ErrorSpan from '../../core/components/ErrorSpan.vue';
import { useDegreeStore } from '../../../stores/degree.store';
import { useAuthStore } from '../../../stores/authStore';

    const degree = useDegreeStore();
    const auth = useAuthStore();

    const props = defineProps({
        nextStep : Function
    })

    const {handleSubmit,setFieldValue,errors} = useForm({
        validationSchema:personalInfoStepSchema,
        initialValues : {
            degreeTypes : []
        }
    });
    const {value:fullnameEnglish,errorMessage:fullnameEnglishError} = useField('fullnameEnglish');

    const data = ref([])

    onMounted(async()=>{
        await degree.getAllDegreeTypes();
        data.value = degree.data
    })


    const totalCalculate = (isSelected,price) =>{
            degree.bill += isSelected ? parseInt(price) : -parseInt(price);
            const degrees = data.value.filter(item => item.selected).map(item => item.id)
            setFieldValue('degreeTypes',degrees)
        }

    const selectedCount = computed(()=>{
        return data.value.filter(item=>item.selected).length || 0
    })


    const onSubmit = handleSubmit((data)=>{
        data.certificateType = "بكالوريوس"
        props.nextStep(data)
    })
</script>

<template>
    <div class="mt-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,.03)]">
        <h5 class="text-sm font-medium text-black-700 text-center">البيانات الشخصية</h5>

        <form @submit.prevent="onSubmit" class="mt-5">

            <div>
                <label for="" class="text-sm font-normal ">الإسم رباعي</label>
                <div class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-user text-black-200'></i>
                    <input disabled placeholder="محمد " :value="auth.user.fullname" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>
            </div>

            <div class="mt-5">
                <label for="" class="text-sm font-normal ">الإسم رباعي إنجليزي</label>
                <div :class="{'validation-error':fullnameEnglishError}" class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                    <i class='bx bx-user text-black-200'></i>
                    <input v-model="fullnameEnglish" placeholder="Mohammed" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                </div>

                <ErrorSpan class="mt-3" v-if="fullnameEnglishError">{{ fullnameEnglishError }}</ErrorSpan>
            </div>
            <div class="flex gap-4 mt-5">
                <div class="">
                    <label for="" class="text-sm font-normal ">الرقم الجامعي</label>
                    <div class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                        <i class='bx bx-id-card text-black-200'></i>
                        <input disabled placeholder="18/11229114" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                    </div>
                </div>
                <div class="">
                    <label for="" class="text-sm font-normal ">العنوان</label>
                    <div class="mt-3 input-box h-[52px] flex items-center pr-2 gap-2 border-2 text-xl bg-hover border-hover rounded-lg ">
                        <i class='bx bx-target-lock text-black-200'></i>
                        <input disabled placeholder="شندي" :value="auth.user.address" type="text" class="w-full h-full outline-none text-l border-none placeholder:text-xs text-gray-400 ">
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <div class="flex items-center gap-4">
                    <label for="" class="text-sm font-normal ">نوع الشهادة</label>
                    <span v-if="selectedCount > 0" class="w-8 h-8 flex items-center justify-center rounded-full bg-hover text-black-500">{{ selectedCount }}</span>
                </div>
                <div class="relative mt-3">
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="degree in data"  @click="degree.selected = !degree.selected,totalCalculate(degree.selected,degree.price)" class="cursor-pointer flex items-center gap-3 p-3 rounded-lg shadow-lg border shadow-[rgba(0,0,0,.03)]" :class="degree.selected ?'bg-[#f3fafa] border border-success':'bg-white border-white'">
                            <span  class="rounded-full w-8 h-8 flex justify-center items-center border  text-secondary" :class="degree.selected ? 'bg-success border border-success':'bg-hover border border-black-200'"><i v-if="degree.selected"  class="bx bx-check text-3xl text-back"></i></span>
                            <div >
                                <h5 class="text-xs text-black-700 font-medium">{{ degree.title }}</h5>
                                <p class="text-xs text-black-500 font-normal mt-1">{{degree.price}} ج.س</p>
                            </div>
                        </div>

                    </div>

                    <ErrorSpan class="mt-3" v-if="errors.degreeTypes">{{ errors.degreeTypes }}</ErrorSpan>

                    <div class="flex items-center mt-5 gap-3 p-4 rounded-lg shadow-lg bg-white shadow-[rgba(0,0,0,.03)]">
                        <h5 class="text-sm text-black-700 font-medium">الفاتورة</h5>
                        <p class="text-xs text-black-500 font-normal mt-1">{{degree.bill}} ج.س</p>
                    </div>
                </div>

                
            </div>

            <div class="mt-5">
                <SubmitBtn>التالي</SubmitBtn>
            </div>
        </form>
        
    </div>
</template>